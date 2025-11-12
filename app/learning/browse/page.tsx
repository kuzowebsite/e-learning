"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getCourses, getUserProgress } from "@/lib/mock-data"
import type { Course } from "@/lib/types"
import { Search, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

export default function BrowseCoursesPage() {
  const { user, isLoading } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userProgressMap, setUserProgressMap] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const allCourses = getCourses().filter((c) => c.published)
      setCourses(allCourses)

      const progress = getUserProgress(user.id)
      const progressMap = progress.reduce(
        (acc, p) => {
          acc[p.courseId] = p.progress
          return acc
        },
        {} as Record<string, number>,
      )
      setUserProgressMap(progressMap)
    }
  }, [user])

  const filteredCourses = courses.filter(
    (course) =>
      course.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-4 duration-500">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t("allCourses")}</h1>
              <p className="text-sm md:text-base text-foreground/60">Explore all available training courses</p>
            </div>

            <div className="animate-in fade-in-0 slide-in-from-top-4 duration-500" style={{ animationDelay: "200ms" }}>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40 group-hover:text-foreground/60 transition-colors" />
                <Input
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 hover:border-foreground/30 focus:border-foreground/50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, index) => {
                const progress = userProgressMap[course.id] || 0
                const status = progress === 0 ? "notStarted" : progress === 100 ? "completed" : "inProgress"

                return (
                  <Card
                    key={course.id}
                    className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-foreground/20 animate-in fade-in-0 zoom-in-95"
                    style={{ animationDelay: `${300 + index * 50}ms` }}
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
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-base md:text-lg line-clamp-2 flex-1">
                          {course.title[language]}
                        </CardTitle>
                        <Badge
                          variant={
                            status === "completed" ? "default" : status === "inProgress" ? "secondary" : "outline"
                          }
                          className="shrink-0 transition-all duration-300 hover:scale-110"
                        >
                          {t(status)}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2 text-xs md:text-sm">
                        {course.description[language]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-foreground/60">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>
                            {course.lessons.length} {t("lessons")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {course.duration} {t("minutes")}
                          </span>
                        </div>
                      </div>
                      <Button asChild className="w-full hover:scale-105 transition-all duration-300 group/btn">
                        <Link href={`/learning/course/${course.id}`}>
                          {progress === 0 ? t("startCourse") : t("continueLearning")}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredCourses.length === 0 && (
              <Card className="animate-in fade-in-0 zoom-in-95 duration-700">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-foreground/60">No courses found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
