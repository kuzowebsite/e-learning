"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { getCourses, saveCourses } from "@/lib/mock-data"
import type { Course } from "@/lib/types"
import Link from "next/link"

export default function CoursesPage() {
  const { user, isLoading } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/learning")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    setCourses(getCourses())
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      course.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const updated = courses.filter((c) => c.id !== courseId)
      saveCourses(updated)
      setCourses(updated)
    }
  }

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-left-4 duration-500">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t("courseManagement")}</h1>
                <p className="text-sm md:text-base text-foreground/60 mt-2">Create and manage training courses</p>
              </div>
              <Button asChild className="hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <Link href="/dashboard/courses/new">
                  <Plus className="mr-2 h-4 w-4" />
                  {t("createCourse")}
                </Link>
              </Button>
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
              {filteredCourses.map((course, index) => (
                <Card
                  key={course.id}
                  className="flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-foreground/20 animate-in fade-in-0 zoom-in-95"
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
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base md:text-lg line-clamp-2 flex-1">
                        {course.title[language]}
                      </CardTitle>
                      <Badge
                        variant={course.published ? "default" : "secondary"}
                        className="shrink-0 transition-all duration-300 hover:scale-110"
                      >
                        {course.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 text-xs md:text-sm">
                      {course.description[language]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end">
                    <div className="flex items-center justify-between text-xs md:text-sm text-foreground/60 mb-4">
                      <span>{course.category}</span>
                      <span>
                        {course.duration} {t("minutes")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:scale-105 transition-all duration-300 bg-transparent"
                        asChild
                      >
                        <Link href={`/dashboard/courses/${course.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t("edit")}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(course.id)}
                        className="hover:scale-110 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/30 transition-all duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
