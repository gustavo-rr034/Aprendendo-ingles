"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import {
  Trophy,
  Target,
  Calendar,
  BookOpen,
  Brain,
  Headphones,
  Star,
  Award,
  TrendingUp,
  Flame,
  Home,
} from "lucide-react"
import Link from "next/link"

type Achievement = {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  requirement: number
  category: "flashcards" | "quiz" | "listening" | "streak" | "overall"
  unlocked: boolean
  progress: number
}

type UserStats = {
  totalPoints: number
  currentStreak: number
  longestStreak: number
  flashcardsLearned: { basic: number; intermediate: number; advanced: number }
  quizScores: { basic: number; intermediate: number; advanced: number }
  listeningScores: { basic: number; intermediate: number; advanced: number }
  totalActivities: number
  lastActivity: string
  level: number
  experiencePoints: number
  nextLevelXP: number
}

const achievements: Achievement[] = [
  {
    id: "first_steps",
    title: "First Steps",
    description: "Complete your first flashcard session",
    icon: BookOpen,
    requirement: 1,
    category: "flashcards",
    unlocked: false,
    progress: 0,
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Score 100% on any quiz",
    icon: Brain,
    requirement: 100,
    category: "quiz",
    unlocked: false,
    progress: 0,
  },
  {
    id: "listening_pro",
    title: "Listening Pro",
    description: "Complete 5 listening exercises",
    icon: Headphones,
    requirement: 5,
    category: "listening",
    unlocked: false,
    progress: 0,
  },
  {
    id: "streak_warrior",
    title: "Streak Warrior",
    description: "Maintain a 7-day learning streak",
    icon: Flame,
    requirement: 7,
    category: "streak",
    unlocked: false,
    progress: 0,
  },
  {
    id: "vocabulary_champion",
    title: "Vocabulary Champion",
    description: "Learn 50 flashcards",
    icon: Star,
    requirement: 50,
    category: "flashcards",
    unlocked: false,
    progress: 0,
  },
  {
    id: "quiz_enthusiast",
    title: "Quiz Enthusiast",
    description: "Complete 10 quizzes",
    icon: Target,
    requirement: 10,
    category: "quiz",
    unlocked: false,
    progress: 0,
  },
  {
    id: "dedicated_learner",
    title: "Dedicated Learner",
    description: "Maintain a 30-day learning streak",
    icon: Calendar,
    requirement: 30,
    category: "streak",
    unlocked: false,
    progress: 0,
  },
  {
    id: "polyglot",
    title: "Polyglot",
    description: "Reach 1000 total points",
    icon: Trophy,
    requirement: 1000,
    category: "overall",
    unlocked: false,
    progress: 0,
  },
]

export default function ProgressPage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    flashcardsLearned: { basic: 0, intermediate: 0, advanced: 0 },
    quizScores: { basic: 0, intermediate: 0, advanced: 0 },
    listeningScores: { basic: 0, intermediate: 0, advanced: 0 },
    totalActivities: 0,
    lastActivity: "",
    level: 1,
    experiencePoints: 0,
    nextLevelXP: 100,
  })

  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements)

  // Load user progress from localStorage
  useEffect(() => {
    const loadProgress = () => {
      // Load flashcard progress
      const flashcardsBasic = JSON.parse(localStorage.getItem("learned-cards-basic") || "[]").length
      const flashcardsIntermediate = JSON.parse(localStorage.getItem("learned-cards-intermediate") || "[]").length
      const flashcardsAdvanced = JSON.parse(localStorage.getItem("learned-cards-advanced") || "[]").length

      // Load quiz scores
      const quizBasic = Number.parseInt(localStorage.getItem("quiz-score-basic") || "0")
      const quizIntermediate = Number.parseInt(localStorage.getItem("quiz-score-intermediate") || "0")
      const quizAdvanced = Number.parseInt(localStorage.getItem("quiz-score-advanced") || "0")

      // Load listening scores
      const listeningBasic = Number.parseInt(localStorage.getItem("listening-score-basic") || "0")
      const listeningIntermediate = Number.parseInt(localStorage.getItem("listening-score-intermediate") || "0")
      const listeningAdvanced = Number.parseInt(localStorage.getItem("listening-score-advanced") || "0")

      // Calculate total activities and points
      const totalFlashcards = flashcardsBasic + flashcardsIntermediate + flashcardsAdvanced
      const totalQuizScore = quizBasic + quizIntermediate + quizAdvanced
      const totalListeningScore = listeningBasic + listeningIntermediate + listeningAdvanced

      const totalPoints = totalFlashcards * 10 + totalQuizScore * 15 + totalListeningScore * 20
      const totalActivities = totalFlashcards + totalQuizScore + totalListeningScore

      // Calculate level and XP
      const level = Math.floor(totalPoints / 100) + 1
      const experiencePoints = totalPoints % 100
      const nextLevelXP = 100

      // Load or calculate streak
      const savedStreak = Number.parseInt(localStorage.getItem("current-streak") || "0")
      const longestStreak = Number.parseInt(localStorage.getItem("longest-streak") || "0")
      const lastActivity = localStorage.getItem("last-activity") || ""

      // Update current streak based on last activity
      const today = new Date().toDateString()
      const lastActivityDate = lastActivity ? new Date(lastActivity).toDateString() : ""
      let currentStreak = savedStreak

      if (lastActivityDate === today) {
        // Activity today, maintain streak
      } else if (lastActivityDate) {
        const daysDiff = Math.floor(
          (new Date(today).getTime() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24),
        )
        if (daysDiff === 1) {
          // Yesterday was last activity, can continue streak if activity today
          // For demo purposes, we'll assume some activity happened
          currentStreak = savedStreak + 1
        } else if (daysDiff > 1) {
          // Streak broken
          currentStreak = 0
        }
      }

      const newStats: UserStats = {
        totalPoints,
        currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        flashcardsLearned: {
          basic: flashcardsBasic,
          intermediate: flashcardsIntermediate,
          advanced: flashcardsAdvanced,
        },
        quizScores: {
          basic: quizBasic,
          intermediate: quizIntermediate,
          advanced: quizAdvanced,
        },
        listeningScores: {
          basic: listeningBasic,
          intermediate: listeningIntermediate,
          advanced: listeningAdvanced,
        },
        totalActivities,
        lastActivity: lastActivity || today,
        level,
        experiencePoints,
        nextLevelXP,
      }

      setUserStats(newStats)

      // Update achievements
      const updatedAchievements = achievements.map((achievement) => {
        let progress = 0
        let unlocked = false

        switch (achievement.category) {
          case "flashcards":
            progress = totalFlashcards
            break
          case "quiz":
            if (achievement.id === "quiz_master") {
              const maxScore = Math.max(quizBasic, quizIntermediate, quizAdvanced)
              progress = maxScore
            } else if (achievement.id === "quiz_enthusiast") {
              progress = totalQuizScore > 0 ? Math.min(totalQuizScore, 10) : 0
            }
            break
          case "listening":
            progress = totalListeningScore
            break
          case "streak":
            progress = currentStreak
            break
          case "overall":
            progress = totalPoints
            break
        }

        unlocked = progress >= achievement.requirement

        return { ...achievement, progress, unlocked }
      })

      setUserAchievements(updatedAchievements)

      // Save updated streak data
      localStorage.setItem("current-streak", currentStreak.toString())
      localStorage.setItem("longest-streak", Math.max(longestStreak, currentStreak).toString())
      localStorage.setItem("last-activity", today)
    }

    loadProgress()
  }, [])

  const unlockedAchievements = userAchievements.filter((a) => a.unlocked)
  const lockedAchievements = userAchievements.filter((a) => !a.unlocked)

  const getLevelTitle = (level: number) => {
    if (level < 5) return "Beginner"
    if (level < 10) return "Intermediate"
    if (level < 20) return "Advanced"
    if (level < 50) return "Expert"
    return "Master"
  }

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your learning journey today!"
    if (streak < 7) return "Keep it up! You're building a great habit."
    if (streak < 30) return "Amazing consistency! You're on fire!"
    return "Incredible dedication! You're a true language learner."
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="progress" showStats={false} />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          {/* Level and XP */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-4 gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold">Level {userStats.level}</h2>
                  <p className="text-muted-foreground">{getLevelTitle(userStats.level)} Learner</p>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{userStats.totalPoints}</div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {userStats.level + 1}</span>
                  <span>
                    {userStats.experiencePoints} / {userStats.nextLevelXP} XP
                  </span>
                </div>
                <Progress value={(userStats.experiencePoints / userStats.nextLevelXP) * 100} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.currentStreak}</div>
                <p className="text-xs text-muted-foreground">days in a row</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flashcards Learned</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats.flashcardsLearned.basic +
                    userStats.flashcardsLearned.intermediate +
                    userStats.flashcardsLearned.advanced}
                </div>
                <p className="text-xs text-muted-foreground">across all levels</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quiz Score</CardTitle>
                <Brain className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats.quizScores.basic + userStats.quizScores.intermediate + userStats.quizScores.advanced}
                </div>
                <p className="text-xs text-muted-foreground">total correct answers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Listening Score</CardTitle>
                <Headphones className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats.listeningScores.basic +
                    userStats.listeningScores.intermediate +
                    userStats.listeningScores.advanced}
                </div>
                <p className="text-xs text-muted-foreground">comprehension points</p>
              </CardContent>
            </Card>
          </div>

          {/* Streak Motivation */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-orange-800">{userStats.currentStreak}-Day Streak!</h3>
                  <p className="text-orange-700 text-sm">{getStreakMessage(userStats.currentStreak)}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-orange-600">Longest Streak</div>
                  <div className="text-2xl font-bold text-orange-800">{userStats.longestStreak}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Progress */}
          <Tabs defaultValue="achievements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="achievements" className="text-xs sm:text-sm">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs sm:text-sm">
                Progress
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-6">
              {/* Unlocked Achievements */}
              {unlockedAchievements.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Unlocked Achievements ({unlockedAchievements.length})
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unlockedAchievements.map((achievement) => {
                      const Icon = achievement.icon
                      return (
                        <Card
                          key={achievement.id}
                          className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                        >
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Icon className="w-5 h-5 text-yellow-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-yellow-800">{achievement.title}</h4>
                                <Badge
                                  variant="outline"
                                  className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs"
                                >
                                  Unlocked!
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-yellow-700">{achievement.description}</p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Locked Achievements */}
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  Goals to Unlock ({lockedAchievements.length})
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lockedAchievements.map((achievement) => {
                    const Icon = achievement.icon
                    const progressPercentage = (achievement.progress / achievement.requirement) * 100
                    return (
                      <Card key={achievement.id} className="opacity-75">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.title}</h4>
                              <div className="text-xs text-muted-foreground">
                                {achievement.progress} / {achievement.requirement}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                          <Progress value={progressPercentage} className="h-2" />
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Flashcards Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      Flashcards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Basic</span>
                        <span>{userStats.flashcardsLearned.basic} learned</span>
                      </div>
                      <Progress value={(userStats.flashcardsLearned.basic / 8) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Intermediate</span>
                        <span>{userStats.flashcardsLearned.intermediate} learned</span>
                      </div>
                      <Progress value={(userStats.flashcardsLearned.intermediate / 8) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Advanced</span>
                        <span>{userStats.flashcardsLearned.advanced} learned</span>
                      </div>
                      <Progress value={(userStats.flashcardsLearned.advanced / 8) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Quiz Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-green-500" />
                      Quizzes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Basic</span>
                        <span>{userStats.quizScores.basic} / 6 correct</span>
                      </div>
                      <Progress value={(userStats.quizScores.basic / 6) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Intermediate</span>
                        <span>{userStats.quizScores.intermediate} / 6 correct</span>
                      </div>
                      <Progress value={(userStats.quizScores.intermediate / 6) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Advanced</span>
                        <span>{userStats.quizScores.advanced} / 6 correct</span>
                      </div>
                      <Progress value={(userStats.quizScores.advanced / 6) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Listening Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-purple-500" />
                      Listening
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Basic</span>
                        <span>{userStats.listeningScores.basic} / 6 correct</span>
                      </div>
                      <Progress value={(userStats.listeningScores.basic / 6) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Intermediate</span>
                        <span>{userStats.listeningScores.intermediate} / 6 correct</span>
                      </div>
                      <Progress value={(userStats.listeningScores.intermediate / 6) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Advanced</span>
                        <span>{userStats.listeningScores.advanced} / 6 correct</span>
                      </div>
                      <Progress value={(userStats.listeningScores.advanced / 6) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Learning Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Learning Sessions</span>
                      <span className="font-medium">{userStats.totalActivities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Level</span>
                      <span className="font-medium">Level {userStats.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Points Earned</span>
                      <span className="font-medium">{userStats.totalPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Longest Streak</span>
                      <span className="font-medium">{userStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Achievements Unlocked</span>
                      <span className="font-medium">
                        {unlockedAchievements.length} / {achievements.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Next Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {lockedAchievements.slice(0, 3).map((achievement) => {
                      const remaining = achievement.requirement - achievement.progress
                      return (
                        <div key={achievement.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{achievement.title}</span>
                            <span className="text-muted-foreground">{remaining} to go</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.requirement) * 100} className="h-2" />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Continue Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4">
                <Link href="/lessons?level=basic" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full bg-transparent">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Practice Flashcards</span>
                    <span className="sm:hidden">Flashcards</span>
                  </Button>
                </Link>
                <Link href="/quiz?level=basic" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Brain className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Take a Quiz</span>
                    <span className="sm:hidden">Quiz</span>
                  </Button>
                </Link>
                <Link href="/listening?level=basic" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Headphones className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Listening Practice</span>
                    <span className="sm:hidden">Listening</span>
                  </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Home className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Back to Home</span>
                    <span className="sm:hidden">Home</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
