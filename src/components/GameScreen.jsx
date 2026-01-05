import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Lightbulb, Trophy, Send, CheckCircle, XCircle, Flag } from 'lucide-react'
import HintCard from './HintCard'
import ScoreDisplay from './ScoreDisplay'
import TimerDisplay from './TimerDisplay'

const GameScreen = ({
  currentMovie,
  score,
  timeLeft,
  hintsRevealed,
  difficulty,
  timerMode,
  onSubmitGuess,
  onUseHint,
  onGiveUp,
  isGameActive
}) => {
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [giveUpResult, setGiveUpResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!guess.trim() || !isGameActive || isSubmitting) return

    setIsSubmitting(true)
    const result = onSubmitGuess(guess.trim())

    setFeedback(result)
    setGuess('')

    setTimeout(() => {
      setFeedback(null)
      setIsSubmitting(false)
    }, 2000)
  }

  const handleGiveUp = () => {
    if (!isGameActive || isSubmitting) return

    setIsSubmitting(true)
    const result = onGiveUp()

    if (result) {
      setGiveUpResult(result)
      setGuess('')

      setTimeout(() => {
        setGiveUpResult(null)
        setIsSubmitting(false)
      }, 3000)
    } else {
      setIsSubmitting(false)
    }
  }

  const getMaxHints = () => {
    switch (difficulty) {
      case 'easy': return 5
      case 'medium': return 3
      case 'hard': return 1
      default: return 3
    }
  }

  const availableHints = currentMovie ? Object.keys(currentMovie.hints).length : 0
  const maxHints = Math.min(getMaxHints(), availableHints)
  const canUseHint = hintsRevealed.length < maxHints && isGameActive

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="game-card"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <ScoreDisplay score={score} />
          {timerMode && <TimerDisplay timeLeft={timeLeft} />}
          <div className="flex items-center space-x-2 text-gray-300">
            <Lightbulb size={20} />
            <span>{hintsRevealed.length} / {maxHints} hints used</span>
          </div>
        </div>

        {/* Movie Description */}
        {currentMovie && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4 text-center gradient-text">
                Guess This Movie!
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed text-center max-w-2xl mx-auto">
                {currentMovie.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Hints */}
        <AnimatePresence>
          {hintsRevealed.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Hints</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {hintsRevealed.map((hintKey, index) => (
                  <motion.div
                    key={hintKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <HintCard
                      type={hintKey}
                      value={currentMovie?.hints[hintKey]}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guess Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess..."
                disabled={!isGameActive || isSubmitting}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg backdrop-blur-sm"
              />
            </div>
            <div className="flex gap-2">
              <motion.button
                type="button"
                onClick={onUseHint}
                disabled={!canUseHint || isSubmitting}
                whileHover={canUseHint ? { scale: 1.05 } : {}}
                whileTap={canUseHint ? { scale: 0.95 } : {}}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${canUseHint
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Lightbulb size={20} className="inline mr-2" />
                Hint
              </motion.button>
              <motion.button
                type="submit"
                disabled={!guess.trim() || !isGameActive || isSubmitting}
                whileHover={guess.trim() && isGameActive ? { scale: 1.05 } : {}}
                whileTap={guess.trim() && isGameActive ? { scale: 0.95 } : {}}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${guess.trim() && isGameActive
                  ? 'btn-primary'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send size={20} className="inline mr-2" />
                    Guess
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={handleGiveUp}
                disabled={!isGameActive || isSubmitting}
                whileHover={isGameActive ? { scale: 1.05 } : {}}
                whileTap={isGameActive ? { scale: 0.95 } : {}}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${isGameActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Flag size={20} className="inline mr-2" />
                Give Up
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className={`text-center py-6 px-8 rounded-xl font-bold text-xl ${feedback.correct
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}
            >
              <div className="flex items-center justify-center space-x-3">
                {feedback.correct ? (
                  <CheckCircle size={28} />
                ) : (
                  <XCircle size={28} />
                )}
                <span>{feedback.message}</span>
              </div>
              {feedback.correct && feedback.pointsEarned && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg mt-2 text-green-300"
                >
                  +{feedback.pointsEarned} points!
                </motion.p>
              )}
            </motion.div>
          )}
          {giveUpResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="text-center py-6 px-8 rounded-xl font-bold text-xl bg-orange-500/20 text-orange-400 border border-orange-500/50"
            >
              <div className="flex items-center justify-center space-x-3">
                <Flag size={28} />
                <span>{giveUpResult.message}</span>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg mt-2 text-orange-300"
              >
                Loading next movie...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Status */}
        {!isGameActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="text-2xl font-bold text-gray-300 mb-4">
              {timeLeft === 0 ? 'Time\'s Up!' : 'Game Over'}
            </div>
            <div className="text-lg text-gray-400">
              Calculating final score...
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default GameScreen