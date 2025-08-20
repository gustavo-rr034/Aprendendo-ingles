"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy, Home } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

type QuestionType = "multiple-choice" | "fill-blank" | "true-false"

type Question = {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  level: "basic" | "intermediate" | "advanced"
  category: "vocabulary" | "grammar" | "comprehension"
}

const quizQuestions: Question[] = [
  // Basic Level Questions
  {
    id: "1",
    type: "multiple-choice",
    question: "What is the correct greeting for the morning?",
    options: ["Good night", "Good morning", "Good evening", "Good afternoon"],
    correctAnswer: "Good morning",
    explanation: "Good morning is used to greet someone in the morning hours, typically before noon.",
    level: "basic",
    category: "vocabulary",
  },
  {
    id: "2",
    type: "fill-blank",
    question: "I ___ a student.",
    correctAnswer: "am",
    explanation: "We use 'am' with the pronoun 'I' in the present tense of the verb 'to be'.",
    level: "basic",
    category: "grammar",
  },
  {
    id: "3",
    type: "multiple-choice",
    question: "Which word means 'água' in English?",
    options: ["Fire", "Water", "Air", "Earth"],
    correctAnswer: "Water",
    explanation: "Water is the English word for 'água' in Portuguese.",
    level: "basic",
    category: "vocabulary",
  },
  {
    id: "4",
    type: "true-false",
    question: "The sentence 'She are happy' is grammatically correct.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "The correct sentence is 'She is happy'. We use 'is' with third person singular (he/she/it).",
    level: "basic",
    category: "grammar",
  },
  {
    id: "5",
    type: "fill-blank",
    question: "Thank you ___ your help.",
    correctAnswer: "for",
    explanation: "We use the preposition 'for' after 'thank you' to indicate what we are grateful for.",
    level: "basic",
    category: "grammar",
  },
  {
    id: "6",
    type: "multiple-choice",
    question: "What do you say when you meet someone for the first time?",
    options: ["Goodbye", "Nice to meet you", "See you later", "Take care"],
    correctAnswer: "Nice to meet you",
    explanation: "'Nice to meet you' is the standard polite expression when meeting someone for the first time.",
    level: "basic",
    category: "vocabulary",
  },

  // Intermediate Level Questions
  {
    id: "7",
    type: "multiple-choice",
    question: "Choose the correct sentence:",
    options: [
      "Although it was raining, we went out.",
      "Although it was raining, but we went out.",
      "Although it was raining, however we went out.",
      "Although it was raining, yet we went out.",
    ],
    correctAnswer: "Although it was raining, we went out.",
    explanation: "When using 'although', we don't need additional conjunctions like 'but', 'however', or 'yet'.",
    level: "intermediate",
    category: "grammar",
  },
  {
    id: "8",
    type: "fill-blank",
    question: "I have been working here ___ five years.",
    correctAnswer: "for",
    explanation: "We use 'for' with a period of time (five years) in present perfect continuous tense.",
    level: "intermediate",
    category: "grammar",
  },
  {
    id: "9",
    type: "multiple-choice",
    question: "What does 'break the ice' mean?",
    options: [
      "To literally break ice",
      "To start a conversation in a social situation",
      "To stop talking",
      "To make someone angry",
    ],
    correctAnswer: "To start a conversation in a social situation",
    explanation:
      "'Break the ice' is an idiom meaning to initiate conversation or make people feel more comfortable in a social setting.",
    level: "intermediate",
    category: "vocabulary",
  },
  {
    id: "10",
    type: "true-false",
    question: "The word 'opportunity' means the same as 'chance'.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Both 'opportunity' and 'chance' refer to a favorable time or situation for doing something.",
    level: "intermediate",
    category: "vocabulary",
  },
  {
    id: "11",
    type: "fill-blank",
    question: "She would have come to the party if she ___ invited.",
    correctAnswer: "had been",
    explanation: "This is a third conditional sentence. We use 'had been' (past perfect passive) in the if-clause.",
    level: "intermediate",
    category: "grammar",
  },
  {
    id: "12",
    type: "multiple-choice",
    question: "Which sentence shows contrast correctly?",
    options: [
      "It was expensive. On the other hand, it was high quality.",
      "It was expensive. On the other hand, it was cheap.",
      "It was expensive. On the other hand, it was costly.",
      "It was expensive. On the other hand, it was pricey.",
    ],
    correctAnswer: "It was expensive. On the other hand, it was high quality.",
    explanation:
      "'On the other hand' introduces a contrasting point. High quality contrasts with being expensive by showing value.",
    level: "intermediate",
    category: "comprehension",
  },

  // Advanced Level Questions
  {
    id: "13",
    type: "multiple-choice",
    question: "What does 'ubiquitous' mean?",
    options: ["Rare and unique", "Present everywhere", "Very expensive", "Difficult to understand"],
    correctAnswer: "Present everywhere",
    explanation: "'Ubiquitous' means existing or being everywhere at the same time; omnipresent.",
    level: "advanced",
    category: "vocabulary",
  },
  {
    id: "14",
    type: "fill-blank",
    question: "___ I known about the traffic, I would have left earlier.",
    correctAnswer: "Had",
    explanation:
      "This is an inverted third conditional. 'Had I known' = 'If I had known'. The inversion makes it more formal.",
    level: "advanced",
    category: "grammar",
  },
  {
    id: "15",
    type: "multiple-choice",
    question: "Choose the sentence with correct subjunctive mood:",
    options: [
      "I suggest that he goes to the doctor.",
      "I suggest that he go to the doctor.",
      "I suggest that he will go to the doctor.",
      "I suggest that he is going to the doctor.",
    ],
    correctAnswer: "I suggest that he go to the doctor.",
    explanation:
      "After verbs like 'suggest', 'recommend', 'insist', we use the subjunctive mood (base form of the verb).",
    level: "advanced",
    category: "grammar",
  },
  {
    id: "16",
    type: "true-false",
    question: "'Serendipity' refers to a pleasant surprise or fortunate accident.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Serendipity means the occurrence of events by chance in a happy or beneficial way.",
    level: "advanced",
    category: "vocabulary",
  },
  {
    id: "17",
    type: "fill-blank",
    question: "Speak quietly ___ someone overhear us.",
    correctAnswer: "lest",
    explanation:
      "'Lest' means 'in case' or 'for fear that'. It's a formal conjunction used to express purpose or result.",
    level: "advanced",
    category: "grammar",
  },
  {
    id: "18",
    type: "multiple-choice",
    question: "What does 'cut to the chase' mean?",
    options: ["To run very fast", "To get to the point quickly", "To stop a conversation", "To chase someone"],
    correctAnswer: "To get to the point quickly",
    explanation: "'Cut to the chase' means to get to the point without wasting time on unnecessary details.",
    level: "advanced",
    category: "vocabulary",
  },
]

export default function QuizPage() {
  const searchParams = useSearchParams()
  const level = (searchParams.get("level") as "basic" | "intermediate" | "advanced") || "basic"

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [fillAnswer, setFillAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set())
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Filter questions by level
  const levelQuestions = quizQuestions.filter((q) => q.level === level)
  const currentQuestion = levelQuestions[currentQuestionIndex]

  // Load quiz progress from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem(`quiz-score-${level}`)
    const savedAnswered = localStorage.getItem(`quiz-answered-${level}`)
    if (savedScore) setScore(Number.parseInt(savedScore))
    if (savedAnswered) setAnsweredQuestions(new Set(JSON.parse(savedAnswered)))
  }, [level])

  // Save quiz progress to localStorage
  useEffect(() => {
    localStorage.setItem(`quiz-score-${level}`, score.toString())
    localStorage.setItem(`quiz-answered-${level}`, JSON.stringify([...answeredQuestions]))
  }, [score, answeredQuestions, level])

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return

    const userAnswer = currentQuestion.type === "fill-blank" ? fillAnswer.trim().toLowerCase() : selectedAnswer
    const correctAnswer = currentQuestion.correctAnswer.toLowerCase()
    const correct = userAnswer === correctAnswer

    setIsCorrect(correct)
    setShowResult(true)

    if (correct && !answeredQuestions.has(currentQuestion.id)) {
      setScore(score + 1)
    }

    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion.id]))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < levelQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setFillAnswer("")
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setFillAnswer("")
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(new Set())
    setQuizCompleted(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "vocabulary":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "grammar":
        return "bg-green-100 text-green-800 border-green-200"
      case "comprehension":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const progress = ((currentQuestionIndex + (showResult ? 1 : 0)) / levelQuestions.length) * 100
  const finalScore = (score / levelQuestions.length) * 100

  if (!currentQuestion && !quizCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>No quiz questions available</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button>
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-lg font-serif font-bold">Quiz Complete!</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <div className="mb-6">
                <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                <h2 className="text-3xl font-serif font-bold mb-2">Quiz Completed!</h2>
                <p className="text-muted-foreground">Great job on completing the {level} level quiz!</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="text-4xl font-bold text-primary">{finalScore.toFixed(0)}%</div>
                <div className="text-lg">
                  You scored {score} out of {levelQuestions.length} questions correctly
                </div>

                <div className="flex justify-center">
                  {finalScore >= 80 ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                      Excellent Performance!
                    </Badge>
                  ) : finalScore >= 60 ? (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">Good Job!</Badge>
                  ) : (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-4 py-2">
                      Keep Practicing!
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Link href="/">
                  <Button variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation currentPage="quiz" showStats={false} />

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2 text-sm sm:text-base">
            <span className="font-medium">Quiz Progress</span>
            <span className="text-muted-foreground">{progress.toFixed(0)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Badge variant="outline" className={getCategoryColor(currentQuestion.category)}>
                  {currentQuestion.category}
                </Badge>
              </div>
              <CardTitle className="text-lg sm:text-xl text-center">{currentQuestion.question}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Multiple Choice Questions */}
              {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showResult}>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label
                          htmlFor={`option-${index}`}
                          className={`flex-1 p-3 rounded-lg border cursor-pointer transition-colors ${
                            showResult
                              ? option === currentQuestion.correctAnswer
                                ? "bg-green-100 border-green-300 text-green-800"
                                : selectedAnswer === option && !isCorrect
                                  ? "bg-red-100 border-red-300 text-red-800"
                                  : "bg-muted/50"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Fill in the Blank Questions */}
              {currentQuestion.type === "fill-blank" && (
                <div className="space-y-4">
                  <Input
                    value={fillAnswer}
                    onChange={(e) => setFillAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    disabled={showResult}
                    className={
                      showResult ? (isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : ""
                    }
                  />
                  {showResult && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Correct answer: {currentQuestion.correctAnswer}</p>
                    </div>
                  )}
                </div>
              )}

              {/* True/False Questions */}
              {currentQuestion.type === "true-false" && currentQuestion.options && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showResult}>
                  <div className="flex gap-4 justify-center">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`tf-${index}`} />
                        <Label
                          htmlFor={`tf-${index}`}
                          className={`px-6 py-3 rounded-lg border cursor-pointer transition-colors ${
                            showResult
                              ? option === currentQuestion.correctAnswer
                                ? "bg-green-100 border-green-300 text-green-800"
                                : selectedAnswer === option && !isCorrect
                                  ? "bg-red-100 border-red-300 text-red-800"
                                  : "bg-muted/50"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              {/* Result and Explanation */}
              {showResult && (
                <Card className={`${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={`font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </span>
                    </div>
                    <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                      {currentQuestion.explanation}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                {!showResult ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={
                      (currentQuestion.type === "fill-blank" && !fillAnswer.trim()) ||
                      (currentQuestion.type !== "fill-blank" && !selectedAnswer)
                    }
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} size="lg" className="w-full sm:w-auto">
                    {currentQuestionIndex < levelQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
