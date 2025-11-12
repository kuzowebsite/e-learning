"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, BookOpen, Award } from "lucide-react"
import { DesktopSidebar } from "@/components/desktop-sidebar"

export default function AnalyticsPage() {
  const { user, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/learning")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  const topCourses = [
    { name: "Introduction to Workplace Safety", enrollments: 18, completionRate: 85 },
    { name: "Customer Service Excellence", enrollments: 15, completionRate: 73 },
    { name: "Data Privacy and Security", enrollments: 8, completionRate: 50 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DesktopSidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("analytics")}</h1>
            <p className="text-muted-foreground mt-2">Platform performance and learning insights</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Engagement Rate",
                icon: TrendingUp,
                value: "72%",
                subtitle: "+5% from last month",
              },
              {
                title: "Active Learners",
                icon: Users,
                value: "18",
                subtitle: "Currently learning",
              },
              {
                title: "Avg. Completion Time",
                icon: BookOpen,
                value: "3.5d",
                subtitle: "Per course",
              },
              {
                title: "Avg. Quiz Score",
                icon: Award,
                value: "82%",
                subtitle: "Across all assessments",
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
              <CardTitle>Most Popular Courses</CardTitle>
              <CardDescription>Courses with highest enrollment and completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topCourses.map((course, index) => (
                  <div
                    key={index}
                    className="space-y-2"
                    style={{
                      animationDelay: `${(index + 4) * 100}ms`,
                      animation: "slideIn 0.5s ease-out forwards",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.enrollments} enrollments</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{course.completionRate}%</p>
                        <p className="text-xs text-muted-foreground">completion</p>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-foreground transition-all duration-1000 ease-out"
                        style={{
                          width: `${course.completionRate}%`,
                          animationDelay: `${(index + 4) * 100 + 300}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </div>
  )
}
