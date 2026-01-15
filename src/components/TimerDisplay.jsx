import React from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'

const TimerDisplay = ({ timeLeft, maxTime = 60, difficulty = 'medium' }) => {
  const progress = (timeLeft / maxTime) * 100
  const circumference = 2 * Math.PI * 25 // radius of 25
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const getTimerColor = () => {
    if (timeLeft <= 10) return { text: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500', stroke: '#ef4444' }
    if (timeLeft <= 30 && maxTime > 30) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500', stroke: '#eab308' }
    if (progress <= 33) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500', stroke: '#eab308' }
    return { text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500', stroke: '#3b82f6' }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const colors = getTimerColor()
  const isUrgent = timeLeft <= 10

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3, repeat: isUrgent ? Infinity : 0 }}
      className={`timer-display ${colors.bg} ${colors.border} ${isUrgent ? 'timer-urgent' : ''}`}
      aria-live="polite"
      aria-label={`Time remaining: ${formatTime(timeLeft)}`}
    >
      {/* Circular Progress Ring */}
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 60 60">
          {/* Background circle */}
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress circle */}
          <motion.circle
            cx="30"
            cy="30"
            r="25"
            stroke={colors.stroke}
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={false}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {isUrgent ? (
            <AlertTriangle size={16} className={colors.text} />
          ) : (
            <Clock size={16} className={colors.text} />
          )}
        </div>
      </div>

      {/* Time Display */}
      <div className="flex flex-col">
        <span className={`text-xl font-mono font-bold ${colors.text}`}>{formatTime(timeLeft)}</span>
        {difficulty === 'hard' && (
          <span className="text-xs text-red-400/70 uppercase tracking-wider">Hard Mode</span>
        )}
      </div>
    </motion.div>
  )
}

export default TimerDisplay