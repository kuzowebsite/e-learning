"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, TrendingUp, CheckCircle } from "lucide-react"
import { getCourses, mockUserProgress } from "@/lib/mock-data"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    totalUsers: 0,
    activeUsers: 0,
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const courses = getCourses()
    setStats({
      totalCourses: courses.length,
      publishedCourses: courses.filter((c) => c.published).length,
      totalUsers: 25,
      activeUsers: mockUserProgress.length,
    })
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

  if (user.role === "employee") {
    router.push("/learning")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DesktopSidebar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-left-4 duration-500">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t("dashboard")}</h1>
              <p className="text-sm md:text-base text-foreground/60">
                {t("welcome")}, {user.name}
              </p>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: t("totalCourses"),
                  value: stats.totalCourses,
                  subtitle: `${stats.publishedCourses} ${t("publishedCourses").toLowerCase()}`,
                  icon: BookOpen,
                  delay: "100ms",
                },
                {
                  title: t("totalUsers"),
                  value: stats.totalUsers,
                  subtitle: `${stats.activeUsers} ${t("activeUsers").toLowerCase()}`,
                  icon: Users,
                  delay: "200ms",
                },
                {
                  title: t("activeUsers"),
                  value: stats.activeUsers,
                  subtitle: "Currently learning",
                  icon: TrendingUp,
                  delay: "300ms",
                },
                {
                  title: "Completion Rate",
                  value: "68%",
                  subtitle: "Average across all courses",
                  icon: CheckCircle,
                  delay: "400ms",
                },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-foreground/20 animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: stat.delay }}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-foreground/80">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-foreground/40 group-hover:text-foreground/80 transition-all duration-300 group-hover:scale-110" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-3xl font-bold transition-all duration-300 group-hover:scale-105">
                      {stat.value}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">{stat.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card
              className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "500ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      color: "bg-green-500",
                      title: "New course published",
                      subtitle: "Customer Service Excellence",
                      time: "2 hours ago",
                      delay: "600ms",
                    },
                    {
                      color: "bg-blue-500",
                      title: "5 users completed training",
                      subtitle: "Workplace Safety",
                      time: "5 hours ago",
                      delay: "700ms",
                    },
                    {
                      color: "bg-yellow-500",
                      title: "Course updated",
                      subtitle: "Data Privacy and Security",
                      time: "1 day ago",
                      delay: "800ms",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 group hover:translate-x-2 transition-all duration-300 animate-in fade-in-0 slide-in-from-left-4"
                      style={{ animationDelay: activity.delay }}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${activity.color} group-hover:scale-150 transition-transform duration-300`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.title}</p>
                        <p className="text-xs text-foreground/50 truncate">{activity.subtitle}</p>
                      </div>
                      <span className="text-xs text-foreground/40 whitespace-nowrap">{activity.time}</span>
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
