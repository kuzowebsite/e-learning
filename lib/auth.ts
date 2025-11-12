"use client"

import type { User } from "./types"

export function login(email: string, password: string): User | null {
  // Mock authentication - in production, this would call an API
  const users: Record<string, User> = {
    "admin@company.com": {
      id: "1",
      email: "admin@company.com",
      name: "Admin User",
      role: "admin",
      avatar: "/admin-interface.png",
    },
    "employee@company.com": {
      id: "2",
      email: "employee@company.com",
      name: "John Doe",
      role: "employee",
      department: "Engineering",
      avatar: "/diverse-office-employee.png",
    },
  }

  const user = users[email]
  if (user && password === "password") {
    localStorage.setItem("user", JSON.stringify(user))
    return user
  }
  return null
}

export function logout() {
  localStorage.removeItem("user")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}
