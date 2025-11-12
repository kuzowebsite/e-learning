"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/types"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved) setLanguageState(saved)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string) => {
    const translations = {
      en: {
        login: "Login",
        logout: "Logout",
        email: "Email",
        password: "Password",
        signIn: "Sign In",
        welcome: "Welcome",
        dashboard: "Dashboard",
        courses: "Courses",
        myCourses: "My Courses",
        progress: "Progress",
        settings: "Settings",
        courseManagement: "Course Management",
        users: "Users",
        analytics: "Analytics",
        allCourses: "All Courses",
        createCourse: "Create Course",
        editCourse: "Edit Course",
        courseTitle: "Course Title",
        description: "Description",
        category: "Category",
        duration: "Duration",
        lessons: "Lessons",
        startCourse: "Start Course",
        continueLearning: "Continue Learning",
        completed: "Completed",
        inProgress: "In Progress",
        notStarted: "Not Started",
        quiz: "Quiz",
        takeQuiz: "Take Quiz",
        submitQuiz: "Submit Quiz",
        score: "Score",
        results: "Results",
        overallProgress: "Overall Progress",
        coursesCompleted: "Courses Completed",
        hoursLearned: "Hours Learned",
        quizzesTaken: "Quizzes Taken",
        totalCourses: "Total Courses",
        totalUsers: "Total Users",
        activeUsers: "Active Users",
        publishedCourses: "Published Courses",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        view: "View",
        search: "Search",
        filter: "Filter",
        language: "Language",
        minutes: "minutes",
        lesson: "Lesson",
        videoLesson: "Video Lesson",
        readingMaterial: "Reading Material",
      },
      mn: {
        login: "Нэвтрэх",
        logout: "Гарах",
        email: "Имэйл",
        password: "Нууц үг",
        signIn: "Нэвтрэх",
        welcome: "Тавтай морил",
        dashboard: "Хяналтын самбар",
        courses: "Сургалтууд",
        myCourses: "Миний сургалтууд",
        progress: "Явц",
        settings: "Тохиргоо",
        courseManagement: "Сургалт удирдлага",
        users: "Хэрэглэгчид",
        analytics: "Тайлан",
        allCourses: "Бүх сургалтууд",
        createCourse: "Шинэ сургалт",
        editCourse: "Засах",
        courseTitle: "Сургалтын нэр",
        description: "Тайлбар",
        category: "Ангилал",
        duration: "Хугацаа",
        lessons: "Хичээлүүд",
        startCourse: "Эхлэх",
        continueLearning: "Үргэлжлүүлэх",
        completed: "Дууссан",
        inProgress: "Явагдаж буй",
        notStarted: "Эхлээгүй",
        quiz: "Шалгалт",
        takeQuiz: "Шалгалт өгөх",
        submitQuiz: "Илгээх",
        score: "Оноо",
        results: "Үр дүн",
        overallProgress: "Нийт явц",
        coursesCompleted: "Дууссан сургалт",
        hoursLearned: "Суралцсан цаг",
        quizzesTaken: "Өгсөн шалгалт",
        totalCourses: "Нийт сургалт",
        totalUsers: "Нийт хэрэглэгч",
        activeUsers: "Идэвхтэй хэрэглэгч",
        publishedCourses: "Нийтлэгдсэн сургалт",
        save: "Хадгалах",
        cancel: "Болих",
        delete: "Устгах",
        edit: "Засах",
        view: "Үзэх",
        search: "Хайх",
        filter: "Шүүх",
        language: "Хэл",
        minutes: "минут",
        lesson: "Хичээл",
        videoLesson: "Видео хичээл",
        readingMaterial: "Уншлагын материал",
      },
    }
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
