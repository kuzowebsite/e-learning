"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DesktopSidebar } from "@/components/desktop-sidebar"

export default function UsersPage() {
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

  const mockUsers = [
    {
      id: "2",
      name: "John Doe",
      email: "employee@company.com",
      department: "Engineering",
      avatar: "/diverse-office-employee.png",
      coursesCompleted: 1,
      coursesInProgress: 1,
      avgScore: 85,
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      department: "Marketing",
      avatar: "/placeholder.svg?key=user2",
      coursesCompleted: 2,
      coursesInProgress: 0,
      avgScore: 92,
    },
    {
      id: "4",
      name: "Michael Chen",
      email: "michael@company.com",
      department: "Sales",
      avatar: "/placeholder.svg?key=user3",
      coursesCompleted: 0,
      coursesInProgress: 2,
      avgScore: 78,
    },
  ]

  if (isLoading || !user) return null

  return (

    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="flex">
        <DesktopSidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("users")}</h1>
            <p className="text-muted-foreground mt-2">Manage employees and track their learning progress</p>
          </div>

          <div className="grid gap-6">
            {mockUsers.map((employee, index) => (
              <Card
                key={employee.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideIn 0.5s ease-out forwards",
                }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-foreground/10">
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{employee.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                      <Badge variant="outline" className="mt-2">
                        {employee.department}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{t("coursesCompleted")}</p>
                      <p className="text-2xl font-bold">{employee.coursesCompleted}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{t("inProgress")}</p>
                      <p className="text-2xl font-bold">{employee.coursesInProgress}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold">{employee.avgScore}%</p>
                    </div>
                  </div>

                  {employee.coursesInProgress > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Overall Progress</p>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(
                            (employee.coursesCompleted / (employee.coursesCompleted + employee.coursesInProgress)) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={Math.round(
                          (employee.coursesCompleted / (employee.coursesCompleted + employee.coursesInProgress)) * 100,
                        )}
                        className="transition-all duration-500"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}
