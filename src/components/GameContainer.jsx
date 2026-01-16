/**
 * GameContainer Component
 * Main container that manages game state transitions between
 * welcome, playing, and game over screens.
 */
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeScreen from './WelcomeScreen'
import GameScreen from './GameScreen'
import GameOverScreen from './GameOverScreen'
import { useGameLogic } from '../hooks/useGameLogic'
import { useLocalStorage } from '../hooks/useLocalStorage'

const GameContainer = () => {
  const [gameState, setGameState] = useState('welcome') // 'welcome', 'playing', 'gameOver'
  const [highScore, setHighScore] = useLocalStorage('movieGameHighScore', 0)
  const [totalGamesPlayed, setTotalGamesPlayed] = useLocalStorage('movieGameTotal', 0)

  const {
    currentMovie,
    score,
    timeLeft,
    hintsRevealed,
    difficulty,
    timerMode,
    gameStats,
    isGameActive,
    getTimeForDifficulty,
    submitGuess,
    useHint,
    giveUp,
    startNewGame,
    resetGame,
    setDifficulty,
    setTimerMode,
  } = useGameLogic()

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore, setHighScore])

  const handleStartGame = (selectedDifficulty, selectedTimerMode) => {
    setDifficulty(selectedDifficulty)
    setTimerMode(selectedTimerMode)
    startNewGame()
    setGameState('playing')
  }

  const handleGameEnd = () => {
    setTotalGamesPlayed(prev => prev + 1)
    setGameState('gameOver')
  }

  const handlePlayAgain = () => {
    resetGame()
    setGameState('welcome')
  }

  const handleContinue = () => {
    startNewGame()
  }

  useEffect(() => {
    if (!isGameActive && gameState === 'playing' && (timeLeft === 0 || gameStats.gamesPlayed > 0)) {
      handleGameEnd()
    }
  }, [isGameActive, gameState, timeLeft, gameStats.gamesPlayed])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {gameState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen
              onStartGame={handleStartGame}
              highScore={highScore}
              totalGamesPlayed={totalGamesPlayed}
            />
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <GameScreen
              currentMovie={currentMovie}
              score={score}
              timeLeft={timeLeft}
              maxTime={getTimeForDifficulty(difficulty)}
              hintsRevealed={hintsRevealed}
              difficulty={difficulty}
              timerMode={timerMode}
              onSubmitGuess={submitGuess}
              onUseHint={useHint}
              onGiveUp={giveUp}
              isGameActive={isGameActive}
            />
          </motion.div>
        )}

        {gameState === 'gameOver' && (
          <motion.div
            key="gameOver"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <GameOverScreen
              score={score}
              highScore={highScore}
              gameStats={gameStats}
              difficulty={difficulty}
              onPlayAgain={handlePlayAgain}
              onContinue={handleContinue}
              isNewHighScore={score > highScore}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GameContainer