/**
 * Game utility functions for Movie Guess Game
 */

/**
 * Normalize user guess for comparison
 * Removes punctuation, extra spaces, and converts to lowercase
 */
export const normalizeGuess = (guess) => {
  return guess
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
}

/**
 * Calculate score based on game parameters
 * @param {string} difficulty - easy, medium, or hard
 * @param {number} hintsUsed - number of hints revealed
 * @param {number} timeLeft - seconds remaining (if timer mode)
 * @param {boolean} timerMode - whether timer is active
 * @returns {number} - calculated score
 */
export const calculateScore = (difficulty, hintsUsed, timeLeft, timerMode) => {
  let baseScore = 10

  // Difficulty multiplier
  const difficultyMultipliers = {
    easy: 1,
    medium: 1.5,
    hard: 2.5 // Increased reward for hard mode
  }

  baseScore *= difficultyMultipliers[difficulty] || 1

  // Hint penalty - higher penalty encourages minimal hint usage
  const hintPenalty = hintsUsed * 3
  baseScore = Math.max(baseScore - hintPenalty, 1)

  // Time bonus (only if timer mode is enabled)
  if (timerMode && timeLeft > 0) {
    // Bonus scales with difficulty
    const timeMultiplier = difficulty === 'hard' ? 0.3 : 0.1
    const timeBonus = Math.floor(timeLeft * timeMultiplier)
    baseScore += timeBonus
  }

  // Perfect game bonus (no hints used)
  if (hintsUsed === 0) {
    baseScore += 5
  }

  return Math.round(baseScore)
}

/**
 * Format seconds into MM:SS format
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Get difficulty settings and metadata
 */
export const getDifficultySettings = (difficulty) => {
  const settings = {
    easy: {
      maxHints: 5,
      scoreMultiplier: 1,
      timeLimit: 120,
      description: 'More hints available',
      color: 'green'
    },
    medium: {
      maxHints: 3,
      scoreMultiplier: 1.5,
      timeLimit: 60,
      description: 'Balanced gameplay',
      color: 'yellow'
    },
    hard: {
      maxHints: 1,
      scoreMultiplier: 2.5,
      timeLimit: 30,
      description: 'Minimal hints, maximum challenge',
      color: 'red'
    }
  }

  return settings[difficulty] || settings.medium
}

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correct, total) => {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

/**
 * Get a motivational message based on score
 */
export const getScoreMessage = (score) => {
  if (score >= 100) return "🏆 Legendary! You're a movie master!"
  if (score >= 50) return "⭐ Amazing! You really know your films!"
  if (score >= 25) return "👍 Great job! Keep watching movies!"
  if (score >= 10) return "😊 Good start! Practice makes perfect!"
  return "💪 Don't give up! Every guess counts!"
}

/**
 * Calculate streak bonus for consecutive correct answers
 */
export const calculateStreakBonus = (streak) => {
  if (streak < 2) return 0
  if (streak >= 10) return 15
  if (streak >= 5) return 10
  if (streak >= 3) return 5
  return 2
}