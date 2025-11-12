"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { GraduationCap } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-6 lg:p-8">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md animate-scale-in shadow-2xl border-2 transition-all duration-300 hover:shadow-3xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center animate-fade-in">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 shadow-lg">
              <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
            </div>
          </div>
          <div className="animate-slide-in">
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">{t("welcome")}</CardTitle>
            <CardDescription className="text-balance mt-2 text-sm md:text-base">
              Company Training Platform
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm md:text-base font-medium">
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@company.com"
                required
                className="transition-all duration-300 focus:scale-[1.02] h-10 md:h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm md:text-base font-medium">
                {t("password")}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="transition-all duration-300 focus:scale-[1.02] h-10 md:h-11"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="animate-slide-in">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-10 md:h-11 text-sm md:text-base font-semibold"
            >
              {t("signIn")}
            </Button>
          </form>

          <div className="mt-6 text-xs md:text-sm text-muted-foreground text-center space-y-1">
            <p className="font-semibold mb-2">Demo Accounts:</p>
            <p>Admin: admin@company.com</p>
            <p>Employee: employee@company.com</p>
            <p className="mt-1 text-[10px] md:text-xs">Password: password</p>
            <p className="font-semibold mb-2">SkyDev LLC</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
