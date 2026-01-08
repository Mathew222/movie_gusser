import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, TrendingUp } from 'lucide-react'

const ScoreDisplay = ({ score, previousScore = 0 }) => {
  const pointsGained = score - previousScore

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="score-badge relative"
    >
      <div className="flex items-center space-x-2">
        <Trophy size={20} className="text-yellow-200" />
        <motion.span
          key={score}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl font-bold"
        >
          {score.toLocaleString()}
        </motion.span>
        <span className="text-xs text-white/70">pts</span>
      </div>
    </motion.div>
  )
}

export default ScoreDisplay