import React from 'react'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'

const ScoreDisplay = ({ score }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="score-badge"
    >
      <div className="flex items-center space-x-2">
        <Trophy size={20} />
        <span className="text-xl font-bold">{score}</span>
      </div>
    </motion.div>
  )
}

export default ScoreDisplay