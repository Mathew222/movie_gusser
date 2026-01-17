/**
 * HintCard Component
 * Displays movie hints with icons and animations.
 * Supports genre, year, actors, director, and dialogue hints.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.type - Hint type: 'genre', 'year', 'actors', 'director', or 'dialogue'
 * @param {string|string[]} props.value - The hint value to display
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MessageSquare, Film, Star, Clapperboard } from 'lucide-react'

const HintCard = ({ type, value }) => {
  const getHintConfig = () => {
    switch (type) {
      case 'genre':
        return { icon: Film, label: 'Genre', color: 'from-pink-500 to-rose-500', iconBg: 'bg-pink-500' }
      case 'year':
        return { icon: Calendar, label: 'Release Year', color: 'from-blue-500 to-cyan-500', iconBg: 'bg-blue-500' }
      case 'actors':
        return { icon: Users, label: 'Cast', color: 'from-green-500 to-emerald-500', iconBg: 'bg-green-500' }
      case 'director':
        return { icon: Clapperboard, label: 'Director', color: 'from-purple-500 to-violet-500', iconBg: 'bg-purple-500' }
      case 'dialogue':
        return { icon: MessageSquare, label: 'Famous Quote', color: 'from-amber-500 to-orange-500', iconBg: 'bg-amber-500' }
      default:
        return { icon: Star, label: 'Hint', color: 'from-gray-500 to-slate-500', iconBg: 'bg-gray-500' }
    }
  }

  const config = getHintConfig()
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="hint-card group hover:border-amber-400/50 transition-all duration-300"
      role="region"
      aria-label={`${config.label} hint`}
    >
      <div className="flex items-center space-x-3 mb-3">
        <motion.div
          whileHover={{ rotate: 15 }}
          className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center shadow-lg`}
        >
          <Icon size={20} className="text-white" />
        </motion.div>
        <h4 className={`font-semibold text-lg bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
          {config.label}
        </h4>
      </div>
      <p className="text-white text-lg leading-relaxed pl-1">
        {type === 'dialogue' ? (
          <span className="italic">"{Array.isArray(value) ? value.join(', ') : value}"</span>
        ) : (
          Array.isArray(value) ? value.join(', ') : value
        )}
      </p>
    </motion.div>
  )
}

export default HintCard