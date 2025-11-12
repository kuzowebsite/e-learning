export type UserRole = "admin" | "employee"
export type Language = "en" | "mn"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department?: string
  avatar?: string
}

export interface Course {
  id: string
  title: { en: string; mn: string }
  description: { en: string; mn: string }
  category: string
  duration: number
  lessons: Lesson[]
  thumbnail: string
  createdAt: string
  published: boolean
}

export interface Lesson {
  id: string
  title: { en: string; mn: string }
  content: { en: string; mn: string }
  videoUrl?: string
  duration: number
  order: number
}

export interface Quiz {
  id: string
  courseId: string
  title: { en: string; mn: string }
  questions: Question[]
}

export interface Question {
  id: string
  question: { en: string; mn: string }
  options: { en: string; mn: string }[]
  correctAnswer: number
}

export interface UserProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  quizScores: { quizId: string; score: number; date: string }[]
  lastAccessed: string
  progress: number
}
