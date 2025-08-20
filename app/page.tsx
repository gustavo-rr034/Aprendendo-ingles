"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { BookOpen, Headphones, Brain, Trophy } from "lucide-react"

type Level = "basic" | "intermediate" | "advanced" | null

export default function HomePage() {
  const [selectedLevel, setSelectedLevel] = useState<Level>(null)

  const levels = [
    {
      id: "basic" as const,
      title: "Básico",
      description: "Perfeito para iniciantes começando sua jornada no inglês",
      features: ["Vocabulário básico", "Gramática simples", "Frases comuns", "Fundamentos de pronúncia"],
      color: "bg-green-100 text-green-800 border-green-200",
      icon: BookOpen,
      difficulty: "Amigável para Iniciantes",
    },
    {
      id: "intermediate" as const,
      title: "Intermediário",
      description: "Construa confiança com habilidades linguísticas mais complexas",
      features: ["Vocabulário avançado", "Gramática complexa", "Prática de conversação", "Compreensão auditiva"],
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Brain,
      difficulty: "Desafio Moderado",
    },
    {
      id: "advanced" as const,
      title: "Avançado",
      description: "Domine a fluência com conceitos linguísticos sofisticados",
      features: ["Vocabulário profissional", "Gramática avançada", "Expressões idiomáticas", "Prática nível nativo"],
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: Trophy,
      difficulty: "Nível Expert",
    },
  ]

  const features = [
    {
      icon: BookOpen,
      title: "Flashcards Interativos",
      description: "Aprenda vocabulário com pronúncia em áudio e repetição espaçada",
    },
    {
      icon: Brain,
      title: "Quizzes Inteligentes",
      description: "Teste seu conhecimento com exercícios adaptativos e feedback instantâneo",
    },
    {
      icon: Headphones,
      title: "Prática de Escuta",
      description: "Melhore a compreensão com exercícios de áudio e conversas reais",
    },
    {
      icon: Trophy,
      title: "Acompanhamento de Progresso",
      description: "Monitore sua jornada de aprendizado com análises detalhadas e conquistas",
    },
  ]

  const handleStartLearning = (type: "lessons" | "quiz" | "listening") => {
    if (selectedLevel) {
      window.location.href = `/${type}?level=${selectedLevel}`
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Domine o Inglês com
            <span className="text-primary block mt-2">Aprendizado Interativo</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Do vocabulário básico à fluência avançada, nossa plataforma abrangente se adapta ao seu estilo de
            aprendizado com flashcards, quizzes e prática de áudio.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-card px-3 sm:px-4 py-2 rounded-full border text-sm"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="font-medium hidden sm:inline">{feature.title}</span>
                <span className="font-medium sm:hidden">{feature.title.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Level Selection */}
      <section className="py-12 sm:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
              Escolha Seu Nível de Aprendizado
            </h3>
            <p className="text-muted-foreground text-base sm:text-lg">
              Selecione o nível que corresponde à sua proficiência atual em inglês
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {levels.map((level) => {
              const Icon = level.icon
              const isSelected = selectedLevel === level.id

              return (
                <Card
                  key={level.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? "ring-2 ring-primary shadow-lg scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-serif">{level.title}</CardTitle>
                    <Badge variant="outline" className={level.color}>
                      {level.difficulty}
                    </Badge>
                    <CardDescription className="text-sm sm:text-base mt-2">{level.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {level.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center space-y-4">
            {selectedLevel && (
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
                  onClick={() => handleStartLearning("lessons")}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Estudar Flashcards
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium bg-transparent w-full sm:w-auto"
                  onClick={() => handleStartLearning("quiz")}
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Fazer Quiz
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium bg-transparent w-full sm:w-auto"
                  onClick={() => handleStartLearning("listening")}
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Prática de Escuta
                </Button>
              </div>
            )}
            {!selectedLevel && (
              <p className="text-sm text-muted-foreground">Por favor, selecione um nível para continuar</p>
            )}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
              Tudo que Você Precisa para Aprender Inglês
            </h3>
            <p className="text-muted-foreground text-base sm:text-lg">
              Ferramentas abrangentes projetadas para aprendizado eficaz de idiomas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-base sm:text-lg font-serif">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-6 sm:py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-foreground">Hub de Aprendizado de Inglês</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Sua jornada para a fluência em inglês começa aqui. Pratique diariamente, seja consistente e alcance seus
            objetivos.
          </p>
        </div>
      </footer>
    </div>
  )
}
