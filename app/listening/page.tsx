"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Navigation } from "@/components/navigation"
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle,
  XCircle,
  Headphones,
  Home,
  VolumeX,
} from "lucide-react"
import Link from "next/link"

type ListeningExercise = {
  id: string
  title: string
  type: "conversation" | "monologue" | "news" | "story"
  level: "basic" | "intermediate" | "advanced"
  audioText: string
  questions: {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }[]
  transcript?: string
}

const listeningExercises: ListeningExercise[] = [
  // Basic Level
  {
    id: "1",
    title: "Meeting a New Friend",
    type: "conversation",
    level: "basic",
    audioText:
      "Hi, my name is Sarah. What's your name? Nice to meet you, John. Where are you from? I'm from Canada. How about you? I'm from Brazil. Do you speak Portuguese? Yes, I do. And you speak English very well. Thank you! I'm still learning.",
    questions: [
      {
        id: "1a",
        question: "What is the woman's name?",
        options: ["Sarah", "Susan", "Sandra", "Samantha"],
        correctAnswer: "Sarah",
        explanation: "The woman introduces herself by saying 'Hi, my name is Sarah.'",
      },
      {
        id: "1b",
        question: "Where is John from?",
        options: ["Canada", "Brazil", "USA", "Mexico"],
        correctAnswer: "Brazil",
        explanation: "John says 'I'm from Brazil' when asked about his origin.",
      },
      {
        id: "1c",
        question: "What language does John speak?",
        options: ["English only", "Portuguese only", "Both English and Portuguese", "Spanish"],
        correctAnswer: "Both English and Portuguese",
        explanation: "John speaks Portuguese (he's from Brazil) and Sarah compliments his English.",
      },
    ],
    transcript:
      "Hi, my name is Sarah. What's your name? Nice to meet you, John. Where are you from? I'm from Canada. How about you? I'm from Brazil. Do you speak Portuguese? Yes, I do. And you speak English very well. Thank you! I'm still learning.",
  },
  {
    id: "2",
    title: "At the Coffee Shop",
    type: "conversation",
    level: "basic",
    audioText:
      "Good morning! Welcome to Coffee Corner. What can I get for you today? I'd like a large coffee, please. Would you like milk or sugar? Just milk, please. No sugar. That will be three dollars and fifty cents. Here you go. Thank you! Have a great day!",
    questions: [
      {
        id: "2a",
        question: "What does the customer order?",
        options: ["Small coffee", "Large coffee", "Tea", "Hot chocolate"],
        correctAnswer: "Large coffee",
        explanation: "The customer clearly states 'I'd like a large coffee, please.'",
      },
      {
        id: "2b",
        question: "What does the customer want in their coffee?",
        options: ["Milk and sugar", "Only sugar", "Only milk", "Nothing"],
        correctAnswer: "Only milk",
        explanation: "The customer says 'Just milk, please. No sugar.'",
      },
      {
        id: "2c",
        question: "How much does the coffee cost?",
        options: ["$2.50", "$3.50", "$4.50", "$5.50"],
        correctAnswer: "$3.50",
        explanation: "The cashier says 'That will be three dollars and fifty cents.'",
      },
    ],
  },

  // Intermediate Level
  {
    id: "3",
    title: "Job Interview Discussion",
    type: "conversation",
    level: "intermediate",
    audioText:
      "Thank you for coming in today. Can you tell me about your previous work experience? I worked as a marketing coordinator for three years at a tech company. I was responsible for managing social media campaigns and organizing events. That sounds impressive. What made you interested in this position? I'm looking for new challenges and opportunities to grow professionally. Your company has an excellent reputation in the industry, and I believe my skills would be a great fit for your team.",
    questions: [
      {
        id: "3a",
        question: "How long did the candidate work at their previous job?",
        options: ["Two years", "Three years", "Four years", "Five years"],
        correctAnswer: "Three years",
        explanation: "The candidate mentions working 'as a marketing coordinator for three years.'",
      },
      {
        id: "3b",
        question: "What were the candidate's main responsibilities?",
        options: [
          "Sales and customer service",
          "Accounting and finance",
          "Social media campaigns and events",
          "Product development",
        ],
        correctAnswer: "Social media campaigns and events",
        explanation:
          "The candidate states they were 'responsible for managing social media campaigns and organizing events.'",
      },
      {
        id: "3c",
        question: "Why is the candidate interested in this position?",
        options: [
          "Higher salary",
          "Better location",
          "New challenges and growth opportunities",
          "Shorter working hours",
        ],
        correctAnswer: "New challenges and growth opportunities",
        explanation:
          "The candidate says they're 'looking for new challenges and opportunities to grow professionally.'",
      },
    ],
  },
  {
    id: "4",
    title: "Weather Forecast",
    type: "news",
    level: "intermediate",
    audioText:
      "Good evening, and here's your weather forecast for tomorrow. We're expecting partly cloudy skies in the morning with temperatures around 22 degrees Celsius. In the afternoon, there's a 60% chance of rain, so don't forget your umbrella. Temperatures will reach a high of 28 degrees. The evening will be cooler with clear skies and temperatures dropping to 18 degrees. Perfect weather for an evening walk!",
    questions: [
      {
        id: "4a",
        question: "What will the weather be like in the morning?",
        options: ["Sunny", "Rainy", "Partly cloudy", "Stormy"],
        correctAnswer: "Partly cloudy",
        explanation: "The forecast mentions 'partly cloudy skies in the morning.'",
      },
      {
        id: "4b",
        question: "What is the chance of rain in the afternoon?",
        options: ["40%", "50%", "60%", "70%"],
        correctAnswer: "60%",
        explanation: "The forecast states 'there's a 60% chance of rain' in the afternoon.",
      },
      {
        id: "4c",
        question: "What will the evening temperature be?",
        options: ["18 degrees", "22 degrees", "28 degrees", "25 degrees"],
        correctAnswer: "18 degrees",
        explanation: "The forecast mentions 'temperatures dropping to 18 degrees' in the evening.",
      },
    ],
  },

  // Advanced Level
  {
    id: "5",
    title: "Technology and Society",
    type: "monologue",
    level: "advanced",
    audioText:
      "The rapid advancement of artificial intelligence has fundamentally transformed how we interact with technology. While these innovations have undoubtedly enhanced productivity and convenience, they have also raised significant concerns about privacy, employment, and the potential for algorithmic bias. As we navigate this digital revolution, it's crucial that we establish ethical frameworks to ensure that technological progress serves humanity's best interests. The challenge lies in balancing innovation with responsibility, fostering development while protecting individual rights and societal values.",
    questions: [
      {
        id: "5a",
        question: "According to the speaker, what has AI fundamentally transformed?",
        options: [
          "Economic systems",
          "How we interact with technology",
          "Educational methods",
          "Transportation systems",
        ],
        correctAnswer: "How we interact with technology",
        explanation: "The speaker states that AI 'has fundamentally transformed how we interact with technology.'",
      },
      {
        id: "5b",
        question: "What concerns does the speaker mention about AI?",
        options: [
          "Cost and accessibility",
          "Speed and efficiency",
          "Privacy, employment, and algorithmic bias",
          "Design and usability",
        ],
        correctAnswer: "Privacy, employment, and algorithmic bias",
        explanation:
          "The speaker specifically mentions concerns about 'privacy, employment, and the potential for algorithmic bias.'",
      },
      {
        id: "5c",
        question: "What does the speaker suggest is crucial for the future?",
        options: ["Faster development", "Establishing ethical frameworks", "Reducing costs", "Increasing competition"],
        correctAnswer: "Establishing ethical frameworks",
        explanation:
          "The speaker emphasizes that 'it's crucial that we establish ethical frameworks' to guide technological progress.",
      },
    ],
  },
  {
    id: "6",
    title: "Environmental Conservation",
    type: "story",
    level: "advanced",
    audioText:
      "Dr. Martinez had dedicated her entire career to marine biology, but nothing had prepared her for what she discovered during her latest research expedition. The coral reef, once vibrant and teeming with life, now appeared bleached and barren. Climate change and ocean acidification had taken their toll. However, in a small protected area, she found signs of recovery. Young corals were beginning to flourish, fish populations were returning, and the ecosystem showed remarkable resilience. This discovery reinforced her belief that with proper conservation efforts and international cooperation, it's possible to reverse environmental damage and restore our planet's natural beauty.",
    questions: [
      {
        id: "6a",
        question: "What is Dr. Martinez's profession?",
        options: ["Environmental lawyer", "Marine biologist", "Climate researcher", "Conservation officer"],
        correctAnswer: "Marine biologist",
        explanation: "The text states that 'Dr. Martinez had dedicated her entire career to marine biology.'",
      },
      {
        id: "6b",
        question: "What caused the damage to the coral reef?",
        options: [
          "Pollution and overfishing",
          "Tourism and development",
          "Climate change and ocean acidification",
          "Natural disasters",
        ],
        correctAnswer: "Climate change and ocean acidification",
        explanation: "The text mentions that 'Climate change and ocean acidification had taken their toll.'",
      },
      {
        id: "6c",
        question: "What did Dr. Martinez find in the protected area?",
        options: [
          "More damage than expected",
          "Signs of recovery and resilience",
          "New species of fish",
          "Evidence of pollution",
        ],
        correctAnswer: "Signs of recovery and resilience",
        explanation:
          "In the protected area, she found 'signs of recovery' with young corals flourishing and the ecosystem showing 'remarkable resilience.'",
      },
    ],
  },
]

export default function ListeningPage() {
  const searchParams = useSearchParams()
  const level = (searchParams.get("level") as "basic" | "intermediate" | "advanced") || "basic"

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [playbackRate, setPlaybackRate] = useState([1])
  const [volume, setVolume] = useState([0.8])
  const [isMuted, setIsMuted] = useState(false)

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Filter exercises by level
  const levelExercises = listeningExercises.filter((ex) => ex.level === level)
  const currentExercise = levelExercises[currentExerciseIndex]
  const currentQuestion = currentExercise?.questions[currentQuestionIndex]

  // Load progress from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem(`listening-score-${level}`)
    const savedCompleted = localStorage.getItem(`listening-completed-${level}`)
    if (savedScore) setScore(Number.parseInt(savedScore))
    if (savedCompleted) setCompletedExercises(new Set(JSON.parse(savedCompleted)))
  }, [level])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`listening-score-${level}`, score.toString())
    localStorage.setItem(`listening-completed-${level}`, JSON.stringify([...completedExercises]))
  }, [score, completedExercises, level])

  const playAudio = () => {
    if (!currentExercise) return

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(currentExercise.audioText)
    utterance.lang = "en-US"
    utterance.rate = playbackRate[0]
    utterance.volume = isMuted ? 0 : volume[0]

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    speechRef.current = utterance
    speechSynthesis.speak(utterance)
  }

  const pauseAudio = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return

    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      // Exercise completed
      setCompletedExercises(new Set([...completedExercises, currentExercise.id]))
      if (currentExerciseIndex < levelExercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1)
        setCurrentQuestionIndex(0)
        setSelectedAnswer("")
        setShowResult(false)
        setShowTranscript(false)
      }
    }
  }

  const resetProgress = () => {
    setCurrentExerciseIndex(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setCompletedExercises(new Set())
    setShowTranscript(false)
    pauseAudio()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "conversation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "monologue":
        return "bg-green-100 text-green-800 border-green-200"
      case "news":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "story":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const totalQuestions = levelExercises.reduce((sum, ex) => sum + ex.questions.length, 0)
  const answeredQuestions = currentExerciseIndex * (levelExercises[0]?.questions.length || 0) + currentQuestionIndex
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0

  if (!currentExercise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>No listening exercises available</CardTitle>
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

  const isExerciseCompleted = completedExercises.has(currentExercise.id)
  const allExercisesCompleted = levelExercises.every((ex) => completedExercises.has(ex.id))

  if (allExercisesCompleted) {
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
              <h1 className="text-lg font-serif font-bold">Listening Practice Complete!</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <div className="mb-6">
                <Headphones className="w-16 h-16 mx-auto text-primary mb-4" />
                <h2 className="text-3xl font-serif font-bold mb-2">Excellent Listening Skills!</h2>
                <p className="text-muted-foreground">
                  You've completed all {levelExercises.length} listening exercises for the {level} level!
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="text-4xl font-bold text-primary">{((score / totalQuestions) * 100).toFixed(0)}%</div>
                <div className="text-lg">
                  You answered {score} out of {totalQuestions} questions correctly
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={resetProgress}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Practice Again
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
      <Navigation currentPage="listening" showStats={false} />

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2 text-sm sm:text-base">
            <span className="font-medium">Overall Progress</span>
            <span className="text-muted-foreground">{progress.toFixed(0)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Exercise Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Audio Player */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="outline" className={getTypeColor(currentExercise.type)}>
                  {currentExercise.type}
                </Badge>
                {isExerciseCompleted && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl sm:text-2xl font-serif">{currentExercise.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Audio Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={isPlaying ? pauseAudio : playAudio}
                  className="px-6 sm:px-8 w-full sm:w-auto"
                >
                  {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                  {isPlaying ? "Pause" : "Play Audio"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="w-full sm:w-auto"
                >
                  {showTranscript ? "Hide" : "Show"} Transcript
                </Button>
              </div>

              {/* Audio Settings */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Speed: {playbackRate[0]}x</Label>
                  <Slider
                    value={playbackRate}
                    onValueChange={setPlaybackRate}
                    min={0.5}
                    max={2}
                    step={0.25}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Volume</Label>
                    <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)} className="h-6 w-6 p-0">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                    disabled={isMuted}
                  />
                </div>
              </div>

              {/* Transcript */}
              {showTranscript && currentExercise.transcript && (
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <h4 className="font-medium mb-2">Transcript:</h4>
                    <p className="text-sm leading-relaxed italic">{currentExercise.transcript}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Question */}
          {currentQuestion && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">
                    Question {currentQuestionIndex + 1} / {currentExercise.questions.length}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl">{currentQuestion.question}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
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
                      disabled={!selectedAnswer}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} size="lg" className="w-full sm:w-auto">
                      {currentQuestionIndex < currentExercise.questions.length - 1
                        ? "Next Question"
                        : currentExerciseIndex < levelExercises.length - 1
                          ? "Next Exercise"
                          : "Finish"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
