"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, Check } from "lucide-react"

type FlashcardProps = {
  english: string
  translation: string
  type: "vocabulary" | "grammar" | "expression"
  example?: string
  isLearned?: boolean
  onToggleLearned?: () => void
  onSpeak?: (text: string) => void
}

export function Flashcard({
  english,
  translation,
  type,
  example,
  isLearned = false,
  onToggleLearned,
  onSpeak,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vocabulary":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "grammar":
        return "bg-green-100 text-green-800 border-green-200"
      case "expression":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "vocabulary":
        return "vocabulário"
      case "grammar":
        return "gramática"
      case "expression":
        return "expressão"
      default:
        return type
    }
  }

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSpeak) {
      onSpeak(text)
    } else if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card
      className={`min-h-[300px] cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isFlipped ? "bg-muted/30" : ""
      } ${isLearned ? "ring-2 ring-green-500" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className={getTypeColor(type)}>
            {getTypeLabel(type)}
          </Badge>
          {isLearned && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <Check className="w-3 h-3 mr-1" />
              Aprendido
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-center space-y-4">
        {!isFlipped ? (
          // Front of card - English
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-2xl font-serif font-bold text-foreground">{english}</h2>
              <Button variant="outline" size="sm" onClick={(e) => handleSpeak(english, e)} className="shrink-0">
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">Clique para ver a tradução</p>
          </div>
        ) : (
          // Back of card - Translation and example
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">{english}</h2>
              <p className="text-lg text-muted-foreground">{translation}</p>
            </div>

            {example && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Exemplo:</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground italic">"{example}"</p>
                  <Button variant="ghost" size="sm" onClick={(e) => handleSpeak(example, e)}>
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}

            <p className="text-muted-foreground text-sm">Clique para virar de volta</p>
          </div>
        )}

        {onToggleLearned && (
          <div className="pt-4">
            <Button
              variant={isLearned ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onToggleLearned()
              }}
              className={isLearned ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <Check className="w-3 h-3 mr-1" />
              {isLearned ? "Aprendido" : "Marcar como Aprendido"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
