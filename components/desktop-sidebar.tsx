"use client"

import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BookOpen, Users, BarChart3, GraduationCap, Library, TrendingUp, LogOut } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function DesktopSidebar() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()

  const adminRoutes = [
    { href: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/dashboard/courses", label: t("courseManagement"), icon: BookOpen },
    { href: "/dashboard/users", label: t("userManagement"), icon: Users },
    { href: "/dashboard/analytics", label: t("analytics"), icon: BarChart3 },
  ]

  const employeeRoutes = [
    { href: "/learning", label: t("myCourses"), icon: GraduationCap },
    { href: "/learning/browse", label: t("allCourses"), icon: Library },
    { href: "/learning/progress", label: t("myProgress"), icon: TrendingUp },
  ]

  const routes = user?.role === "admin" ? adminRoutes : employeeRoutes

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-foreground/10 bg-background fixed top-[73px] bottom-0 left-0">
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {routes.map((route, index) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
              "hover:bg-foreground/5 hover:translate-x-1",
              pathname === route.href ? "bg-foreground/10 font-medium" : "font-normal",
            )}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: "slideIn 0.3s ease-out forwards",
            }}
          >
            <route.icon
              className={cn(
                "h-5 w-5 transition-all duration-300",
                pathname === route.href ? "text-foreground" : "text-foreground/60 group-hover:text-foreground",
              )}
            />
            <span
              className={cn(
                "transition-colors duration-300",
                pathname === route.href ? "text-foreground" : "text-foreground/80",
              )}
            >
              {route.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-foreground/10">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 hover:bg-foreground/5 transition-all duration-300 group"
        >
          <LogOut className="h-5 w-5 text-foreground/60 group-hover:text-foreground transition-colors" />
          <span>{t("logout")}</span>
        </Button>
      </div>
    </aside>
  )
}
