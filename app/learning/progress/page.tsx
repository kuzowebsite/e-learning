"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getCourses, getUserProgress } from "@/lib/mock-data"
import { Trophy, Clock, BookOpen, TrendingUp } from "lucide-react"
import { DesktopSidebar } from "@/components/desktop-sidebar"

export default function ProgressPage() {
  const { user, isLoading } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHours: 0,
    quizzesPassed: 0,
    avgScore: 0,
  })
  const [courseProgress, setCourseProgress] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const courses = getCourses().filter((c) => c.published)
      const progress = getUserProgress(user.id)

      const completed = progress.filter((p) => p.progress === 100).length
      const inProgress = progress.filter((p) => p.progress > 0 && p.progress < 100).length

      const totalMinutes = progress.reduce((sum, p) => {
        const course = courses.find((c) => c.id === p.courseId)
        if (course) {
          return sum + (course.duration * p.progress) / 100
        }
        return sum
      }, 0)

      const allQuizScores = progress.flatMap((p) => p.quizScores)
      const passedQuizzes = allQuizScores.filter((s) => s.score >= 70).length
      const avgScore =
        allQuizScores.length > 0
          ? Math.round(allQuizScores.reduce((sum, s) => sum + s.score, 0) / allQuizScores.length)
          : 0

      setStats({
        coursesCompleted: completed,
        coursesInProgress: inProgress,
        totalHours: Math.round((totalMinutes / 60) * 10) / 10,
        quizzesPassed: passedQuizzes,
        avgScore,
      })

      const progressData = progress
        .map((p) => {
          const course = courses.find((c) => c.id === p.courseId)
          return {
            course,
            progress: p,
          }
        })
        .filter((item) => item.course)

      setCourseProgress(progressData)
    }
  }, [user])

  if (isLoading || !user) return null

  return (
    
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DesktopSidebar />
        
      <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("progress")}</h1>
            <p className="text-muted-foreground mt-2">Track your learning journey and achievements</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: t("coursesCompleted"),
                icon: Trophy,
                value: stats.coursesCompleted,
                subtitle: `${stats.coursesInProgress} ${t("inProgress").toLowerCase()}`,
              },
              {
                title: t("hoursLearned"),
                icon: Clock,
                value: `${stats.totalHours}h`,
                subtitle: "Time invested in learning",
              },
              {
                title: t("quizzesTaken"),
                icon: BookOpen,
                value: stats.quizzesPassed,
                subtitle: "Assessments passed",
              },
              {
                title: "Average Score",
                icon: TrendingUp,
                value: `${stats.avgScore}%`,
                subtitle: "Across all quizzes",
              },
            ].map((stat, index) => (
              <Card
                key={stat.title}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideIn 0.5s ease-out forwards",
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Your progress across all enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courseProgress.length > 0 ? (
                  courseProgress.map(({ course, progress }, index) => (
                    <div
                      key={course.id}
                      className="space-y-2"
                      style={{
                        animationDelay: `${(index + 4) * 100}ms`,
                        animation: "slideIn 0.5s ease-out forwards",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="font-medium">{course.title[language]}</p>
                            <Badge variant={progress.progress === 100 ? "default" : "secondary"}>
                              {progress.progress === 100 ? t("completed") : t("inProgress")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {progress.completedLessons.length} of {course.lessons.length} {t("lessons").toLowerCase()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{progress.progress}%</p>
                        </div>
                      </div>
                      <Progress value={progress.progress} className="transition-all duration-500" />

                      {progress.quizScores.length > 0 && (
                        <div className="flex items-center gap-4 pt-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Quiz Score:{" "}
                              <span className="font-medium text-foreground">
                                {progress.quizScores[progress.quizScores.length - 1].score}%
                              </span>
                            </span>
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {new Date(progress.lastAccessed).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No courses started yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {stats.quizzesPassed > 0 && (
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseProgress
                    .filter(({ progress }) => progress.quizScores.length > 0)
                    .slice(0, 5)
                    .map(({ course, progress }, index) => {
                      const latestQuiz = progress.quizScores[progress.quizScores.length - 1]
                      return (
                        <div
                          key={course.id}
                          className="flex items-center gap-4 hover:bg-foreground/5 p-2 rounded-lg transition-all duration-300"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: "slideIn 0.5s ease-out forwards",
                          }}
                        >
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              latestQuiz.score >= 70 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                            }`}
                          >
                            <Trophy
                              className={`h-5 w-5 ${latestQuiz.score >= 70 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{course.title[language]}</p>
                            <p className="text-sm text-muted-foreground">Scored {latestQuiz.score}% on quiz</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(latestQuiz.date).toLocaleDateString()}
                          </span>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
    </div>
  )
}
