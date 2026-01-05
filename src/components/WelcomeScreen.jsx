import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Trophy, Clock, Zap, Target, Film } from 'lucide-react'

const WelcomeScreen = ({ onStartGame, highScore, totalGamesPlayed }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium')
  const [selectedTimerMode, setSelectedTimerMode] = useState(false)

  const difficulties = [
    { id: 'easy', name: 'Easy', description: '5 hints available', icon: Target, color: 'from-green-500 to-emerald-600' },
    { id: 'medium', name: 'Medium', description: '3 hints available', icon: Zap, color: 'from-yellow-500 to-orange-600' },
    { id: 'hard', name: 'Hard', description: '1 hint available', icon: Trophy, color: 'from-red-500 to-pink-600' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="game-card text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <Film size={80} className="mx-auto mb-4 text-purple-400" />
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Movie Guess Game
          </h1>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            Test your movie knowledge! Guess the film from clues and descriptions.
          </p>
        </motion.div>

        {(highScore > 0 || totalGamesPlayed > 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 bg-white/10 rounded-xl border border-white/20"
          >
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <Trophy className="mx-auto mb-2 text-yellow-500" size={24} />
                <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
                <p className="text-sm text-gray-400">High Score</p>
              </div>
              <div>
                <Film className="mx-auto mb-2 text-blue-500" size={24} />
                <p className="text-2xl font-bold text-blue-400">{totalGamesPlayed}</p>
                <p className="text-sm text-gray-400">Games Played</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white">Choose Difficulty</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficulties.map((diff, index) => {
              const Icon = diff.icon
              return (
                <motion.button
                  key={diff.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedDifficulty === diff.id
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                      : 'border-white/20 bg-white/10 hover:border-purple-400 hover:bg-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${diff.color} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{diff.name}</h4>
                  <p className="text-sm text-gray-400">{diff.description}</p>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <Clock className="text-blue-400" size={24} />
            <span className="text-lg font-medium">Timer Mode</span>
            <button
              onClick={() => setSelectedTimerMode(!selectedTimerMode)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                selectedTimerMode ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <motion.div
                animate={{ x: selectedTimerMode ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {selectedTimerMode ? '60 seconds per movie' : 'No time limit'}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStartGame(selectedDifficulty, selectedTimerMode)}
          className="btn-primary text-xl px-12 py-4 shadow-xl"
        >
          <Play className="inline mr-3" size={24} />
          Start Game
        </motion.button>
      </motion.div>
    </div>
  )
}

export default WelcomeScreen