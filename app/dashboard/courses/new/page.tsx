"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { getCourses, saveCourses } from "@/lib/mock-data"
import type { Course, Lesson } from "@/lib/types"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function NewCoursePage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const [titleEn, setTitleEn] = useState("")
  const [titleMn, setTitleMn] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionMn, setDescriptionMn] = useState("")
  const [category, setCategory] = useState("")
  const [published, setPublished] = useState(false)
  const [lessons, setLessons] = useState<Partial<Lesson>[]>([
    { order: 1, duration: 0, title: { en: "", mn: "" }, content: { en: "", mn: "" } },
  ])

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        order: lessons.length + 1,
        duration: 0,
        title: { en: "", mn: "" },
        content: { en: "", mn: "" },
      },
    ])
  }

  const removeLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index))
  }

  const updateLesson = (index: number, field: string, value: any) => {
    const updated = [...lessons]
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      updated[index] = {
        ...updated[index],
        [parent]: {
          ...(updated[index][parent as keyof Lesson] as any),
          [child]: value,
        },
      }
    } else {
      updated[index] = { ...updated[index], [field]: value }
    }
    setLessons(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const courses = getCourses()
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: { en: titleEn, mn: titleMn },
      description: { en: descriptionEn, mn: descriptionMn },
      category,
      duration: lessons.reduce((sum, l) => sum + (l.duration || 0), 0),
      published,
      thumbnail: "/training-course.png",
      createdAt: new Date().toISOString(),
      lessons: lessons.map((l, i) => ({
        id: `lesson-${Date.now()}-${i}`,
        title: l.title!,
        content: l.content!,
        duration: l.duration || 0,
        order: i + 1,
        videoUrl: l.videoUrl,
      })),
    }

    saveCourses([...courses, newCourse])
    router.push("/dashboard/courses")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DesktopSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 animate-in fade-in-0 slide-in-from-left-4 duration-500">
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-all duration-300">
                <Link href="/dashboard/courses">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{t("createCourse")}</h1>
                <p className="text-sm md:text-base text-foreground/60 mt-1">
                  Add a new training course to the platform
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card
                className="hover:shadow-lg transition-all duration-500 animate-in fade-in-0 zoom-in-95"
                style={{ animationDelay: "200ms" }}
              >
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                  <CardDescription>Provide course details in both languages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title-en">Title (English)</Label>
                      <Input
                        id="title-en"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title-mn">Title (Mongolian)</Label>
                      <Input
                        id="title-mn"
                        value={titleMn}
                        onChange={(e) => setTitleMn(e.target.value)}
                        className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="desc-en">Description (English)</Label>
                      <Textarea
                        id="desc-en"
                        value={descriptionEn}
                        onChange={(e) => setDescriptionEn(e.target.value)}
                        rows={3}
                        className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc-mn">Description (Mongolian)</Label>
                      <Textarea
                        id="desc-mn"
                        value={descriptionMn}
                        onChange={(e) => setDescriptionMn(e.target.value)}
                        rows={3}
                        className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., Safety, IT, Customer Service"
                      className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300">
                    <div className="space-y-0.5">
                      <Label>Publish Course</Label>
                      <p className="text-sm text-foreground/60">Make this course visible to employees</p>
                    </div>
                    <Switch checked={published} onCheckedChange={setPublished} />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-all duration-500 animate-in fade-in-0 zoom-in-95"
                style={{ animationDelay: "300ms" }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Lessons</CardTitle>
                      <CardDescription>Add lessons to your course</CardDescription>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLesson}
                      className="hover:scale-105 transition-all duration-300 bg-transparent"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg space-y-4 hover:border-foreground/30 hover:shadow-md transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4"
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Lesson {index + 1}</h3>
                        {lessons.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLesson(index)}
                            className="hover:scale-110 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Title (English)</Label>
                          <Input
                            value={lesson.title?.en || ""}
                            onChange={(e) => updateLesson(index, "title.en", e.target.value)}
                            className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Title (Mongolian)</Label>
                          <Input
                            value={lesson.title?.mn || ""}
                            onChange={(e) => updateLesson(index, "title.mn", e.target.value)}
                            className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Content (English)</Label>
                          <Textarea
                            value={lesson.content?.en || ""}
                            onChange={(e) => updateLesson(index, "content.en", e.target.value)}
                            rows={3}
                            className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Content (Mongolian)</Label>
                          <Textarea
                            value={lesson.content?.mn || ""}
                            onChange={(e) => updateLesson(index, "content.mn", e.target.value)}
                            rows={3}
                            className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Duration (minutes)</Label>
                          <Input
                            type="number"
                            value={lesson.duration || 0}
                            onChange={(e) => updateLesson(index, "duration", Number.parseInt(e.target.value))}
                            min="0"
                            className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Video URL (optional)</Label>
                          <Input
                            value={lesson.videoUrl || ""}
                            onChange={(e) => updateLesson(index, "videoUrl", e.target.value)}
                            placeholder="https://..."
                            className="transition-all duration-300 hover:border-foreground/30 focus:border-foreground/50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div
                className="flex gap-4 justify-end animate-in fade-in-0 slide-in-from-bottom-4"
                style={{ animationDelay: "500ms" }}
              >
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <Link href="/dashboard/courses">{t("cancel")}</Link>
                </Button>
                <Button type="submit" className="hover:scale-105 transition-all duration-300">
                  {t("save")}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
