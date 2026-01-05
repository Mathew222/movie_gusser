export const normalizeGuess = (guess) => {
  return guess
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
}

export const calculateScore = (difficulty, hintsUsed, timeLeft, timerMode) => {
  let baseScore = 10

  // Difficulty multiplier
  const difficultyMultipliers = {
    easy: 1,
    medium: 1.5,
    hard: 2
  }
  
  baseScore *= difficultyMultipliers[difficulty] || 1

  // Hint penalty
  const hintPenalty = hintsUsed * 2
  baseScore = Math.max(baseScore - hintPenalty, 1)

  // Time bonus (only if timer mode is enabled)
  if (timerMode && timeLeft > 0) {
    const timeBonus = Math.floor(timeLeft / 10)
    baseScore += timeBonus
  }

  return Math.round(baseScore)
}

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const getDifficultySettings = (difficulty) => {
  const settings = {
    easy: { maxHints: 5, scoreMultiplier: 1, description: 'More hints available' },
    medium: { maxHints: 3, scoreMultiplier: 1.5, description: 'Balanced gameplay' },
    hard: { maxHints: 1, scoreMultiplier: 2, description: 'Minimal hints, maximum challenge' }
  }
  
  return settings[difficulty] || settings.medium
}