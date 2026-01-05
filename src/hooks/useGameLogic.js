import { useState, useEffect, useCallback } from 'react'
import { getRandomMovie } from '../data/movies'
import { calculateScore, normalizeGuess } from '../utils/gameUtils'

export const useGameLogic = () => {
  const [currentMovie, setCurrentMovie] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [hintsRevealed, setHintsRevealed] = useState([])
  const [difficulty, setDifficulty] = useState('medium')
  const [timerMode, setTimerMode] = useState(false)
  const [isGameActive, setIsGameActive] = useState(false)
  const [gameStats, setGameStats] = useState({
    correctGuesses: 0,
    totalGuesses: 0,
    gamesPlayed: 0,
    hintsUsed: 0
  })
  const [usedMovies, setUsedMovies] = useState([])

  // Timer effect
  useEffect(() => {
    let interval
    if (timerMode && isGameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerMode, isGameActive, timeLeft])

  const startNewGame = useCallback(() => {
    const newMovie = getRandomMovie()
    setCurrentMovie(newMovie)
    setHintsRevealed([])
    setTimeLeft(60)
    setIsGameActive(true)
    setUsedMovies(prev => [...prev, newMovie.id])
  }, [])

  const resetGame = useCallback(() => {
    setCurrentMovie(null)
    setScore(0)
    setTimeLeft(60)
    setHintsRevealed([])
    setIsGameActive(false)
    setGameStats({
      correctGuesses: 0,
      totalGuesses: 0,
      gamesPlayed: 0,
      hintsUsed: 0
    })
    setUsedMovies([])
  }, [])

  const submitGuess = useCallback((guess) => {
    if (!currentMovie || !isGameActive) return { correct: false, message: 'Game not active' }

    const normalizedGuess = normalizeGuess(guess)
    const normalizedTitle = normalizeGuess(currentMovie.title)
    const isCorrect = normalizedGuess === normalizedTitle

    setGameStats(prev => ({
      ...prev,
      totalGuesses: prev.totalGuesses + 1,
      correctGuesses: prev.correctGuesses + (isCorrect ? 1 : 0)
    }))

    if (isCorrect) {
      const pointsEarned = calculateScore(difficulty, hintsRevealed.length, timeLeft, timerMode)
      setScore(prev => prev + pointsEarned)
      
      setGameStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1
      }))

      // Start new movie after a delay
      setTimeout(() => {
        startNewGame()
      }, 2000)

      return {
        correct: true,
        message: `Correct! The movie is "${currentMovie.title}"`,
        pointsEarned
      }
    } else {
      return {
        correct: false,
        message: 'Not quite right, try again!'
      }
    }
  }, [currentMovie, isGameActive, difficulty, hintsRevealed.length, timeLeft, timerMode, startNewGame])

  const useHint = useCallback(() => {
    if (!currentMovie || hintsRevealed.length >= getMaxHints()) return

    const availableHints = Object.keys(currentMovie.hints).filter(
      hintKey => !hintsRevealed.includes(hintKey)
    )

    if (availableHints.length > 0) {
      const randomHint = availableHints[Math.floor(Math.random() * availableHints.length)]
      setHintsRevealed(prev => [...prev, randomHint])
      setGameStats(prev => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1
      }))
    }
  }, [currentMovie, hintsRevealed])

  const getMaxHints = () => {
    switch (difficulty) {
      case 'easy': return 5
      case 'medium': return 3
      case 'hard': return 1
      default: return 3
    }
  }

  return {
    currentMovie,
    score,
    timeLeft,
    hintsRevealed,
    difficulty,
    timerMode,
    gameStats,
    isGameActive,
    submitGuess,
    useHint,
    startNewGame,
    resetGame,
    setDifficulty,
    setTimerMode,
  }
}