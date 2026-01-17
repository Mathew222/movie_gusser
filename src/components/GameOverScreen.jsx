/**
 * GameOverScreen Component
 * Displays final score, game statistics, and new high score
 * celebration with play again options.
 * 
 * @param {Object} props - Component properties
 * @param {number} props.score - Current game score
 * @param {number} props.highScore - All-time high score
 * @param {Object} props.gameStats - Game statistics object
 * @param {string} props.difficulty - Game difficulty level
 * @param {Function} props.onPlayAgain - Handler for new game
 * @param {Function} props.onContinue - Handler for continuing
 * @param {boolean} props.isNewHighScore - Whether this is a new high score
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Play, Star, Target, Clock } from 'lucide-react'

const GameOverScreen = ({
  score,
  highScore,
  gameStats,
  difficulty,
  onPlayAgain,
  onContinue,
  isNewHighScore
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'hard': return 'text-red-400'
      default: return 'text-blue-400'
    }
  }

  const getAccuracy = () => {
    if (gameStats.totalGuesses === 0) return 0
    return Math.round((gameStats.correctGuesses / gameStats.totalGuesses) * 100)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="game-card text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          {isNewHighScore ? (
            <>
              <Trophy size={80} className="mx-auto mb-4 text-yellow-500" />
              <h1 className="text-4xl font-bold gradient-text mb-2">
                New High Score!
              </h1>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl font-bold text-yellow-400 mb-4"
              >
                {score}
              </motion.div>
            </>
          ) : (
            <>
              <Star size={80} className="mx-auto mb-4 text-purple-400" />
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Game Complete!
              </h1>
              <div className="text-5xl font-bold text-white mb-4">
                {score}
              </div>
            </>
          )}
          <p className="text-xl text-gray-300">
            Great job on your movie knowledge!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <Target className="mx-auto mb-2 text-blue-400" size={24} />
            <div className="text-2xl font-bold text-white">{gameStats.correctGuesses}</div>
            <div className="text-sm text-gray-400">Correct</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">{gameStats.totalGuesses}</div>
            <div className="text-sm text-gray-400">Total Guesses</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white">{getAccuracy()}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className={`text-2xl font-bold capitalize ${getDifficultyColor()}`}>
              {difficulty}
            </div>
            <div className="text-sm text-gray-400">Difficulty</div>
          </div>
        </motion.div>

        {/* High Score Display */}
        {!isNewHighScore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl"
          >
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="text-yellow-500" size={24} />
              <span className="text-lg font-semibold">Personal Best: {highScore}</span>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="btn-primary px-8 py-4 text-lg"
          >
            <Play className="inline mr-3" size={24} />
            Play Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="btn-secondary px-8 py-4 text-lg"
          >
            <RotateCcw className="inline mr-3" size={24} />
            New Game
          </motion.button>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 italic">
            {score >= 100 ? "Movie Master! 🎬" :
              score >= 50 ? "Great movie knowledge! 🌟" :
                "Keep watching more movies! 📽️"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GameOverScreen