import type { Course, Quiz, UserProgress } from "./types"

export const mockCourses: Course[] = [
  {
    id: "1",
    title: {
      en: "Introduction to Workplace Safety",
      mn: "Ажлын байрны аюулгүй байдлын үндэс",
    },
    description: {
      en: "Learn essential workplace safety protocols and emergency procedures.",
      mn: "Ажлын байрны аюулгүй байдлын протокол болон яаралтай тусламжийн журмуудыг суралцаарай.",
    },
    category: "Safety",
    duration: 45,
    thumbnail: "/workplace-safety-awareness.png",
    published: true,
    createdAt: "2024-01-15",
    lessons: [
      {
        id: "l1",
        title: { en: "Safety Basics", mn: "Аюулгүй байдлын үндэс" },
        content: {
          en: "Understanding workplace safety fundamentals and your responsibilities.",
          mn: "Ажлын байрны аюулгүй байдлын үндэс болон таны үүрэг хариуцлагыг ойлгох.",
        },
        duration: 15,
        order: 1,
      },
      {
        id: "l2",
        title: { en: "Emergency Procedures", mn: "Яаралтай тусламжийн журам" },
        content: {
          en: "Learn what to do in case of fire, medical emergency, or evacuation.",
          mn: "Гал түймэр, эмнэлгийн яаралтай тусламж, нүүлгэн шилжүүлэлтийн үед юу хийх талаар суралцаарай.",
        },
        videoUrl: "/videos/emergency-procedures.mp4",
        duration: 20,
        order: 2,
      },
      {
        id: "l3",
        title: { en: "Personal Protective Equipment", mn: "Хувийн хамгаалах хэрэгсэл" },
        content: {
          en: "Proper use and maintenance of PPE in the workplace.",
          mn: "Ажлын байранд хувийн хамгаалах хэрэгслийг зөв ашиглах, засвар үйлчилгээ хийх.",
        },
        duration: 10,
        order: 3,
      },
    ],
  },
  {
    id: "2",
    title: {
      en: "Customer Service Excellence",
      mn: "Үйлчлүүлэгчийн тусламж үйлчилгээний шилдэг туршлага",
    },
    description: {
      en: "Master the art of exceptional customer service and communication.",
      mn: "Үйлчлүүлэгчийн тусламж үйлчилгээ болон харилцааны урлагт суралцаарай.",
    },
    category: "Customer Service",
    duration: 60,
    thumbnail: "/customer-service-interaction.png",
    published: true,
    createdAt: "2024-01-20",
    lessons: [
      {
        id: "l4",
        title: { en: "Communication Skills", mn: "Харилцааны ур чадвар" },
        content: {
          en: "Effective communication techniques for customer interactions.",
          mn: "Үйлчлүүлэгчтэй харилцах үр дүнтэй харилцааны арга техник.",
        },
        duration: 20,
        order: 1,
      },
      {
        id: "l5",
        title: { en: "Handling Difficult Situations", mn: "Хүндрэлтэй нөхцөл байдлыг шийдвэрлэх" },
        content: {
          en: "Strategies for managing challenging customer interactions.",
          mn: "Хэцүү үйлчлүүлэгчийн харилцааг удирдах стратеги.",
        },
        videoUrl: "/videos/difficult-situations.mp4",
        duration: 25,
        order: 2,
      },
      {
        id: "l6",
        title: { en: "Building Customer Loyalty", mn: "Үйлчлүүлэгчийн итгэлцлийг бий болгох" },
        content: {
          en: "Create lasting relationships with customers through excellent service.",
          mn: "Шилдэг үйлчилгээгээр үйлчлүүлэгчтэй урт хугацааны харилцаа бий болгох.",
        },
        duration: 15,
        order: 3,
      },
    ],
  },
  {
    id: "3",
    title: {
      en: "Data Privacy and Security",
      mn: "Өгөгдлийн нууцлал ба аюулгүй байдал",
    },
    description: {
      en: "Understand data protection regulations and best practices.",
      mn: "Өгөгдлийн хамгаалалтын зохицуулалт болон шилдэг туршлагуудыг ойлгоорой.",
    },
    category: "IT Security",
    duration: 90,
    thumbnail: "/data-security-concept.png",
    published: false,
    createdAt: "2024-02-01",
    lessons: [
      {
        id: "l7",
        title: { en: "Introduction to Data Privacy", mn: "Өгөгдлийн нууцлалын танилцуулга" },
        content: {
          en: "Understanding GDPR and data protection principles.",
          mn: "GDPR болон өгөгдлийн хамгаалалтын зарчмуудыг ойлгох.",
        },
        duration: 30,
        order: 1,
      },
    ],
  },
]

export const mockQuizzes: Quiz[] = [
  {
    id: "q1",
    courseId: "1",
    title: {
      en: "Workplace Safety Assessment",
      mn: "Ажлын байрны аюулгүй байдлын үнэлгээ",
    },
    questions: [
      {
        id: "q1-1",
        question: {
          en: "What should you do first in case of a fire alarm?",
          mn: "Гал түймрийн дохио дуугарах үед эхлээд юу хийх ёстой вэ?",
        },
        options: [
          { en: "Gather personal belongings", mn: "Хувийн эд зүйлсээ цуглуулах" },
          { en: "Evacuate immediately", mn: "Даруй нүүлгэн шилжүүлэх" },
          { en: "Call family members", mn: "Гэр бүлийн гишүүддээ залгах" },
          { en: "Turn off computers", mn: "Компьютеруудыг унтраах" },
        ],
        correctAnswer: 1,
      },
      {
        id: "q1-2",
        question: {
          en: "How often should fire extinguishers be inspected?",
          mn: "Гал унтраагчийг хэр удаа шалгах ёстой вэ?",
        },
        options: [
          { en: "Once a year", mn: "Жилд нэг удаа" },
          { en: "Every 6 months", mn: "Хагас жилд нэг удаа" },
          { en: "Monthly", mn: "Сар бүр" },
          { en: "Only when used", mn: "Зөвхөн ашиглах үед" },
        ],
        correctAnswer: 2,
      },
      {
        id: "q1-3",
        question: {
          en: "What does PPE stand for?",
          mn: "PPE гэдэг юуны товчлол вэ?",
        },
        options: [
          { en: "Personal Protection Equipment", mn: "Хувийн хамгаалалтын тоног төхөөрөмж" },
          { en: "Personal Protective Equipment", mn: "Хувийн хамгаалах хэрэгсэл" },
          { en: "Public Protection Equipment", mn: "Олон нийтийн хамгаалалтын тоног төхөөрөмж" },
          { en: "Proper Protection Equipment", mn: "Зөв хамгаалалтын тоног төхөөрөмж" },
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "q2",
    courseId: "2",
    title: {
      en: "Customer Service Excellence Quiz",
      mn: "Үйлчлүүлэгчийн тусламжийн шалгалт",
    },
    questions: [
      {
        id: "q2-1",
        question: {
          en: "What is the most important aspect of customer service?",
          mn: "Үйлчлүүлэгчийн тусламжийн хамгийн чухал тал юу вэ?",
        },
        options: [
          { en: "Speed", mn: "Хурд" },
          { en: "Active listening", mn: "Идэвхтэй сонсох" },
          { en: "Product knowledge", mn: "Бүтээгдэхүүний мэдлэг" },
          { en: "Sales skills", mn: "Борлуулалтын ур чадвар" },
        ],
        correctAnswer: 1,
      },
      {
        id: "q2-2",
        question: {
          en: "How should you handle an angry customer?",
          mn: "Уурласан үйлчлүүлэгчтэй хэрхэн харьцах вэ?",
        },
        options: [
          { en: "Argue back", mn: "Маргалдах" },
          { en: "Ignore them", mn: "Үл тоох" },
          { en: "Stay calm and empathize", mn: "Тайван байж өрөвдөх" },
          { en: "Transfer to manager immediately", mn: "Даруй менежерт шилжүүлэх" },
        ],
        correctAnswer: 2,
      },
    ],
  },
]

export const mockUserProgress: UserProgress[] = [
  {
    userId: "2",
    courseId: "1",
    completedLessons: ["l1", "l2"],
    quizScores: [{ quizId: "q1", score: 85, date: "2024-02-15" }],
    lastAccessed: "2024-02-15",
    progress: 67,
  },
  {
    userId: "2",
    courseId: "2",
    completedLessons: ["l4"],
    quizScores: [],
    lastAccessed: "2024-02-10",
    progress: 33,
  },
]

// Helper functions for mock data management
export function getCourses(): Course[] {
  if (typeof window === "undefined") return mockCourses
  const stored = localStorage.getItem("courses")
  return stored ? JSON.parse(stored) : mockCourses
}

export function saveCourses(courses: Course[]) {
  localStorage.setItem("courses", JSON.stringify(courses))
}

export function getUserProgress(userId: string): UserProgress[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("userProgress")
  const allProgress = stored ? JSON.parse(stored) : mockUserProgress
  return allProgress.filter((p: UserProgress) => p.userId === userId)
}

export function saveUserProgress(progress: UserProgress) {
  const stored = localStorage.getItem("userProgress")
  const allProgress = stored ? JSON.parse(stored) : mockUserProgress
  const index = allProgress.findIndex(
    (p: UserProgress) => p.userId === progress.userId && p.courseId === progress.courseId,
  )
  if (index >= 0) {
    allProgress[index] = progress
  } else {
    allProgress.push(progress)
  }
  localStorage.setItem("userProgress", JSON.stringify(allProgress))
}
