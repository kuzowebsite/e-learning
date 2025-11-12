"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  GraduationCap,
  Library,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-foreground/5 transition-all duration-300">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 bg-background border-r border-foreground/10">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-foreground/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{t("menu")}</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="hover:bg-foreground/5">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {routes.map((route, index) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                  "hover:bg-foreground/5 hover:translate-x-1",
                  pathname === route.href ? "bg-foreground/10 font-medium" : "font-normal",
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: open ? "slideIn 0.3s ease-out forwards" : "none",
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
              onClick={() => {
                logout()
                setOpen(false)
              }}
              className="w-full justify-start gap-3 hover:bg-foreground/5 transition-all duration-300 group"
            >
              <LogOut className="h-5 w-5 text-foreground/60 group-hover:text-foreground transition-colors" />
              <span>{t("logout")}</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
