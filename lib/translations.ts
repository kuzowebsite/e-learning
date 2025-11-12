import type { Language } from "./types"

export const translations = {
  en: {
    // Auth
    login: "Login",
    logout: "Logout",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    welcome: "Welcome",

    // Navigation
    dashboard: "Dashboard",
    courses: "Courses",
    myCourses: "My Courses",
    progress: "Progress",
    settings: "Settings",
    courseManagement: "Course Management",
    users: "Users",
    analytics: "Analytics",

    // Course
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

    // Quiz
    quiz: "Quiz",
    takeQuiz: "Take Quiz",
    submitQuiz: "Submit Quiz",
    score: "Score",
    results: "Results",

    // Progress
    overallProgress: "Overall Progress",
    coursesCompleted: "Courses Completed",
    hoursLearned: "Hours Learned",
    quizzesTaken: "Quizzes Taken",

    // Admin
    totalCourses: "Total Courses",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    publishedCourses: "Published Courses",

    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    search: "Search",
    filter: "Filter",
    language: "Language",
  },
  mn: {
    // Auth
    login: "Нэвтрэх",
    logout: "Гарах",
    email: "Имэйл",
    password: "Нууц үг",
    signIn: "Нэвтрэх",
    welcome: "Тавтай морил",

    // Navigation
    dashboard: "Хяналтын самбар",
    courses: "Сургалтууд",
    myCourses: "Миний сургалтууд",
    progress: "Явц",
    settings: "Тохиргоо",
    courseManagement: "Сургалт удирдлага",
    users: "Хэрэглэгчид",
    analytics: "Тайлан",

    // Course
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

    // Quiz
    quiz: "Шалгалт",
    takeQuiz: "Шалгалт өгөх",
    submitQuiz: "Илгээх",
    score: "Оноо",
    results: "Үр дүн",

    // Progress
    overallProgress: "Нийт явц",
    coursesCompleted: "Дууссан сургалт",
    hoursLearned: "Суралцсан цаг",
    quizzesTaken: "Өгсөн шалгалт",

    // Admin
    totalCourses: "Нийт сургалт",
    totalUsers: "Нийт хэрэглэгч",
    activeUsers: "Идэвхтэй хэрэглэгч",
    publishedCourses: "Нийтлэгдсэн сургалт",

    // Common
    save: "Хадгалах",
    cancel: "Болих",
    delete: "Устгах",
    edit: "Засах",
    view: "Үзэх",
    search: "Хайх",
    filter: "Шүүх",
    language: "Хэл",
  },
}

export function translate(key: string, lang: Language): string {
  return translations[lang][key as keyof typeof translations.en] || key
}
