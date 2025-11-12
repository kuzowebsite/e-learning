"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getCourses, getUserProgress } from "@/lib/mock-data"
import type { Course, UserProgress } from "@/lib/types"
import { Play, CheckCircle2, BookOpen } from "lucide-react"
import Link from "next/link"

export default function LearningPage() {
  const { user, isLoading } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [inProgressCourses, setInProgressCourses] = useState<{ course: Course; progress: UserProgress }[]>([])
  const [completedCourses, setCompletedCourses] = useState<{ course: Course; progress: UserProgress }[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user?.role === "admin") {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const courses = getCourses().filter((c) => c.published)
      const userProgress = getUserProgress(user.id)

      const inProgress = userProgress
        .filter((p) => p.progress < 100)
        .map((p) => ({
          course: courses.find((c) => c.id === p.courseId)!,
          progress: p,
        }))
        .filter((item) => item.course)

      const completed = userProgress
        .filter((p) => p.progress === 100)
        .map((p) => ({
          course: courses.find((c) => c.id === p.courseId)!,
          progress: p,
        }))
        .filter((item) => item.course)

      setInProgressCourses(inProgress)
      setCompletedCourses(completed)
    }
  }, [user])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-foreground/20 border-t-foreground" />
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DesktopSidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-4 duration-500">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t("myCourses")}</h1>
              <p className="text-sm md:text-base text-foreground/60">{t("continueLearning")}</p>
            </div>

            {inProgressCourses.length > 0 && (
              <div
                className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "200ms" }}
              >
                <h2 className="text-xl md:text-2xl font-semibold">{t("inProgress")}</h2>
                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {inProgressCourses.map(({ course, progress }, index) => (
                    <Card
                      key={course.id}
                      className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-foreground/20 animate-in fade-in-0 zoom-in-95"
                      style={{ animationDelay: `${300 + index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="aspect-video rounded-lg overflow-hidden bg-foreground/5 mb-4 relative group-hover:shadow-lg transition-all duration-500">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title[language]}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />
                        </div>
                        <CardTitle className="text-base md:text-lg line-clamp-2 group-hover:text-foreground/80 transition-colors">
                          {course.title[language]}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-xs md:text-sm">
                          {course.description[language]}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs md:text-sm">
                            <span className="text-foreground/60">{t("progress")}</span>
                            <span className="font-semibold">{progress.progress}%</span>
                          </div>
                          <Progress value={progress.progress} className="h-2" />
                        </div>
                        <Button asChild className="w-full group/btn hover:scale-105 transition-all duration-300">
                          <Link href={`/learning/course/${course.id}`}>
                            <Play className="mr-2 h-4 w-4 group-hover/btn:animate-pulse" />
                            {t("continueLearning")}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {completedCourses.length > 0 && (
              <div
                className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "400ms" }}
              >
                <h2 className="text-xl md:text-2xl font-semibold">{t("completed")}</h2>
                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {completedCourses.map(({ course, progress }, index) => (
                    <Card
                      key={course.id}
                      className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-foreground/20 animate-in fade-in-0 zoom-in-95"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="aspect-video rounded-lg overflow-hidden bg-foreground/5 mb-4 relative">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title[language]}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center transition-all duration-500 group-hover:bg-foreground/40">
                            <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16 text-background group-hover:scale-125 transition-transform duration-500" />
                          </div>
                        </div>
                        <CardTitle className="text-base md:text-lg line-clamp-2">{course.title[language]}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          asChild
                          className="w-full hover:scale-105 transition-all duration-300 bg-transparent"
                        >
                          <Link href={`/learning/course/${course.id}`}>{t("view")}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {inProgressCourses.length === 0 && completedCourses.length === 0 && (
              <Card className="animate-in fade-in-0 zoom-in-95 duration-700" style={{ animationDelay: "300ms" }}>
                <CardContent className="flex flex-col items-center justify-center py-12 md:py-16">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-foreground/5 flex items-center justify-center mb-4 animate-pulse">
                    <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-foreground/40" />
                  </div>
                  <p className="text-foreground/60 mb-6 text-sm md:text-base">You haven't started any courses yet</p>
                  <Button asChild className="hover:scale-105 transition-all duration-300">
                    <Link href="/learning/browse">Browse Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
