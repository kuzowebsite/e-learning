"use client"

import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, TrendingUp, Library } from "lucide-react"

const routes = [
  {
    label: "myCourses",
    icon: BookOpen,
    href: "/learning",
  },
  {
    label: "allCourses",
    icon: Library,
    href: "/learning/browse",
  },
  {
    label: "progress",
    icon: TrendingUp,
    href: "/learning/progress",
  },
]

export function EmployeeSidebar() {
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-muted/40 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
      <nav className="flex flex-col gap-1 md:gap-2 p-3 md:p-4">
        {routes.map((route, index) => (
          <Link
            key={route.href}
            href={route.href}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 md:py-3 text-sm font-medium transition-all duration-300 animate-slide-in hover:scale-[1.02]",
              pathname === route.href
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
            )}
          >
            <route.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm md:text-base">{t(route.label)}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
