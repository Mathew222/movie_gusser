import React from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

const TimerDisplay = ({ timeLeft }) => {
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-red-400 bg-red-500/20 border-red-500/50'
    if (timeLeft <= 30) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
    return 'text-blue-400 bg-blue-500/20 border-blue-500/50'
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      animate={timeLeft <= 10 ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
      className={`px-4 py-2 rounded-full font-bold border ${getTimerColor()} flex items-center space-x-2`}
    >
      <Clock size={20} />
      <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
    </motion.div>
  )
}

export default TimerDisplay