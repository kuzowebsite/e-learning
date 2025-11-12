"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getCourses, getUserProgress, saveUserProgress } from "@/lib/mock-data"
import type { Course, UserProgress, Lesson } from "@/lib/types"
import { ArrowLeft, CheckCircle2, Circle, PlayCircle } from "lucide-react"
import Link from "next/link"

export default function CourseViewPage() {
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    if (user) {
      const courses = getCourses()
      const found = courses.find((c) => c.id === courseId)
      if (found) {
        setCourse(found)
        setCurrentLesson(found.lessons[0])
      }

      const progress = getUserProgress(user.id)
      const courseProgress = progress.find((p) => p.courseId === courseId)

      if (courseProgress) {
        setUserProgress(courseProgress)
      } else {
        const newProgress: UserProgress = {
          userId: user.id,
          courseId,
          completedLessons: [],
          quizScores: [],
          lastAccessed: new Date().toISOString(),
          progress: 0,
        }
        setUserProgress(newProgress)
        saveUserProgress(newProgress)
      }
    }
  }, [user, courseId])

  const markLessonComplete = (lessonId: string) => {
    if (!userProgress || !course) return

    const completedLessons = userProgress.completedLessons.includes(lessonId)
      ? userProgress.completedLessons
      : [...userProgress.completedLessons, lessonId]

    const progress = Math.round((completedLessons.length / course.lessons.length) * 100)

    const updated: UserProgress = {
      ...userProgress,
      completedLessons,
      progress,
      lastAccessed: new Date().toISOString(),
    }

    setUserProgress(updated)
    saveUserProgress(updated)
  }

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    if (userProgress) {
      const updated = {
        ...userProgress,
        lastAccessed: new Date().toISOString(),
      }
      saveUserProgress(updated)
    }
  }

  if (!course || !userProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DesktopSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/learning">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight">{course.title[language]}</h1>
                <p className="text-muted-foreground mt-2">{course.description[language]}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{currentLesson?.title[language]}</CardTitle>
                        <CardDescription className="mt-2">
                          {t("lesson")} {currentLesson?.order} of {course.lessons.length}
                        </CardDescription>
                      </div>
                      {currentLesson && userProgress.completedLessons.includes(currentLesson.id) ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {t("completed")}
                        </Badge>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentLesson?.videoUrl && (
                      <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">{t("videoLesson")}</p>
                        </div>
                      </div>
                    )}

                    <div className="prose prose-sm max-w-none">
                      <p className="text-foreground leading-relaxed">{currentLesson?.content[language]}</p>
                    </div>

                    <div className="flex gap-4 pt-4 border-t">
                      <Button
                        onClick={() => currentLesson && markLessonComplete(currentLesson.id)}
                        disabled={currentLesson && userProgress.completedLessons.includes(currentLesson.id)}
                        className="flex-1"
                      >
                        {currentLesson && userProgress.completedLessons.includes(currentLesson.id) ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {t("completed")}
                          </>
                        ) : (
                          "Mark as Complete"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {userProgress.progress === 100 && (
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle>{t("quiz")}</CardTitle>
                      <CardDescription>Test your knowledge with the course assessment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full" size="lg">
                        <Link href={`/learning/course/${courseId}/quiz`}>{t("takeQuiz")}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t("overallProgress")}</span>
                        <span className="font-medium">{userProgress.progress}%</span>
                      </div>
                      <Progress value={userProgress.progress} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {userProgress.completedLessons.length} of {course.lessons.length} {t("lessons")}{" "}
                      {t("completed").toLowerCase()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("lessons")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {course.lessons.map((lesson) => {
                        const isCompleted = userProgress.completedLessons.includes(lesson.id)
                        const isCurrent = currentLesson?.id === lesson.id

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => selectLesson(lesson)}
                            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                              isCurrent ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                            }`}
                          >
                            <div className="mt-0.5">
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : (
                                <Circle className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm line-clamp-2">{lesson.title[language]}</p>
                              <p className="text-xs opacity-80 mt-1">
                                {lesson.duration} {t("minutes")}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
