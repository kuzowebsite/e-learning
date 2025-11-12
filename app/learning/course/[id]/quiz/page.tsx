"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCourses, mockQuizzes, getUserProgress, saveUserProgress } from "@/lib/mock-data"
import type { Quiz, UserProgress } from "@/lib/types"
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from "lucide-react"
import Link from "next/link"

export default function QuizPage() {
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    const foundCourse = getCourses().find((c) => c.id === courseId)
    setCourse(foundCourse)

    const foundQuiz = mockQuizzes.find((q) => q.courseId === courseId)
    if (foundQuiz) {
      setQuiz(foundQuiz)
    }
  }, [courseId])

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex })
  }

  const handleSubmit = () => {
    if (!quiz || !user) return

    let correct = 0
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })

    const scorePercentage = Math.round((correct / quiz.questions.length) * 100)
    setScore(scorePercentage)
    setSubmitted(true)

    // Save quiz score to user progress
    const progress = getUserProgress(user.id)
    const courseProgress = progress.find((p) => p.courseId === courseId)

    if (courseProgress) {
      const updatedProgress: UserProgress = {
        ...courseProgress,
        quizScores: [
          ...courseProgress.quizScores.filter((s) => s.quizId !== quiz.id),
          {
            quizId: quiz.id,
            score: scorePercentage,
            date: new Date().toISOString(),
          },
        ],
      }
      saveUserProgress(updatedProgress)
    }
  }

  if (!quiz || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No quiz available for this course</p>
          <Button asChild>
            <Link href={`/learning/course/${courseId}`}>Back to Course</Link>
          </Button>
        </div>
      </div>
    )
  }

  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined)

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/learning/course/${courseId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{quiz.title[language]}</h1>
              <p className="text-muted-foreground mt-2">{course.title[language]}</p>
            </div>
          </div>

          {!submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Assessment Questions</CardTitle>
                <CardDescription>Answer all questions to complete the quiz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {quiz.questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {qIndex + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium leading-relaxed">{question.question[language]}</p>
                      </div>
                    </div>

                    <RadioGroup
                      value={answers[question.id]?.toString()}
                      onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
                      className="ml-11 space-y-3"
                    >
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-x-3">
                          <RadioGroupItem value={oIndex.toString()} id={`${question.id}-${oIndex}`} />
                          <Label htmlFor={`${question.id}-${oIndex}`} className="flex-1 cursor-pointer leading-relaxed">
                            {option[language]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}

                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={handleSubmit} disabled={!allAnswered} size="lg">
                    {t("submitQuiz")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`h-20 w-20 rounded-full flex items-center justify-center ${
                        score >= 70 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <Trophy className={`h-10 w-10 ${score >= 70 ? "text-green-600" : "text-red-600"}`} />
                    </div>
                  </div>
                  <CardTitle className="text-3xl">{score >= 70 ? "Congratulations!" : "Keep Learning!"}</CardTitle>
                  <CardDescription className="text-lg mt-2">You scored {score}% on this quiz</CardDescription>
                </CardHeader>
                <CardContent>
                  {score >= 70 ? (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Great job! You've passed this assessment.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="bg-red-50 border-red-200">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        You need at least 70% to pass. Review the course materials and try again.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("results")}</CardTitle>
                  <CardDescription>Review your answers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {quiz.questions.map((question, qIndex) => {
                    const userAnswer = answers[question.id]
                    const isCorrect = userAnswer === question.correctAnswer

                    return (
                      <div key={question.id} className="space-y-3">
                        <div className="flex gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold ${
                              isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {qIndex + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium leading-relaxed">{question.question[language]}</p>
                          </div>
                        </div>

                        <div className="ml-11 space-y-2">
                          {question.options.map((option, oIndex) => {
                            const isUserAnswer = userAnswer === oIndex
                            const isCorrectAnswer = question.correctAnswer === oIndex

                            return (
                              <div
                                key={oIndex}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectAnswer
                                    ? "border-green-500 bg-green-50"
                                    : isUserAnswer
                                      ? "border-red-500 bg-red-50"
                                      : "border-border"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {isCorrectAnswer && (
                                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                                  )}
                                  <p
                                    className={`flex-1 ${
                                      isCorrectAnswer
                                        ? "text-green-900 font-medium"
                                        : isUserAnswer
                                          ? "text-red-900"
                                          : ""
                                    }`}
                                  >
                                    {option[language]}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href={`/learning/course/${courseId}`}>Back to Course</Link>
                </Button>
                {score < 70 && (
                  <Button
                    onClick={() => {
                      setAnswers({})
                      setSubmitted(false)
                      setScore(0)
                    }}
                    className="flex-1"
                  >
                    Retake Quiz
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
