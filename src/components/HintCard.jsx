import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MessageSquare, Film, Star } from 'lucide-react'

const HintCard = ({ type, value }) => {
  const getHintIcon = () => {
    switch (type) {
      case 'genre': return Film
      case 'year': return Calendar
      case 'actors': return Users
      case 'director': return Star
      case 'dialogue': return MessageSquare
      default: return Film
    }
  }

  const getHintLabel = () => {
    switch (type) {
      case 'genre': return 'Genre'
      case 'year': return 'Release Year'
      case 'actors': return 'Cast'
      case 'director': return 'Director'
      case 'dialogue': return 'Famous Quote'
      default: return 'Hint'
    }
  }

  const Icon = getHintIcon()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="hint-card"
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
          <Icon size={20} className="text-white" />
        </div>
        <h4 className="font-semibold text-amber-300 text-lg">
          {getHintLabel()}
        </h4>
      </div>
      <p className="text-white text-lg leading-relaxed">
        {Array.isArray(value) ? value.join(', ') : value}
      </p>
    </motion.div>
  )
}

export default HintCard