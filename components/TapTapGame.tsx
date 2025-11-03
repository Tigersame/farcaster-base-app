'use client'

import { useState, useEffect } from 'react'

interface GameStats {
  level: number
  score: number
  taps: number
  targetTaps: number
  timeLeft: number
}

const TOTAL_LEVELS = 10
const LEVEL_CONFIG = [
  { targetTaps: 10, timeLimit: 30 },   // Level 1
  { targetTaps: 20, timeLimit: 30 },   // Level 2
  { targetTaps: 30, timeLimit: 35 },   // Level 3
  { targetTaps: 45, timeLimit: 35 },  // Level 4
  { targetTaps: 60, timeLimit: 40 },  // Level 5
  { targetTaps: 80, timeLimit: 40 },  // Level 6
  { targetTaps: 100, timeLimit: 45 }, // Level 7
  { targetTaps: 120, timeLimit: 45 }, // Level 8
  { targetTaps: 150, timeLimit: 50 }, // Level 9
  { targetTaps: 200, timeLimit: 50 }, // Level 10
]

export function TapTapGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed' | 'gameOver'>('idle')
  const [stats, setStats] = useState<GameStats>({
    level: 1,
    score: 0,
    taps: 0,
    targetTaps: LEVEL_CONFIG[0].targetTaps,
    timeLeft: LEVEL_CONFIG[0].timeLimit,
  })
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('tapGameHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10))
    }
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && stats.timeLeft > 0) {
      const interval = setInterval(() => {
        setStats((prev) => {
          const newTime = prev.timeLeft - 1
          if (newTime <= 0) {
            // Time's up - end game
            setGameState('gameOver')
            // Check and save high score
            setHighScore((currentHighScore) => {
              if (prev.score > currentHighScore) {
                localStorage.setItem('tapGameHighScore', prev.score.toString())
                return prev.score
              }
              return currentHighScore
            })
            return prev
          }
          return { ...prev, timeLeft: newTime }
        })
      }, 1000)
      setTimer(interval as any)
      return () => clearInterval(interval as any)
    } else if (timer) {
      clearInterval(timer as any)
      setTimer(null)
    }
  }, [gameState, stats.timeLeft])

  const startGame = () => {
    setGameState('playing')
    setStats({
      level: 1,
      score: 0,
      taps: 0,
      targetTaps: LEVEL_CONFIG[0].targetTaps,
      timeLeft: LEVEL_CONFIG[0].timeLimit,
    })
  }

  const handleTap = () => {
    if (gameState !== 'playing') return

    setStats((prev) => {
      const newTaps = prev.taps + 1
      const pointsPerTap = prev.level * 10 // More points at higher levels
      const newScore = prev.score + pointsPerTap

      // Check if level completed
      if (newTaps >= prev.targetTaps) {
        const nextLevel = prev.level + 1
        if (nextLevel > TOTAL_LEVELS) {
          // Game completed!
            setTimeout(() => {
              setGameState('completed')
              setHighScore((currentHighScore) => {
                if (newScore > currentHighScore) {
                  localStorage.setItem('tapGameHighScore', newScore.toString())
                  return newScore
                }
                return currentHighScore
              })
            }, 100)
          return { ...prev, taps: newTaps, score: newScore }
        }

        // Level up!
        const levelConfig = LEVEL_CONFIG[nextLevel - 1]
        return {
          level: nextLevel,
          score: newScore,
          taps: 0,
          targetTaps: levelConfig.targetTaps,
          timeLeft: levelConfig.timeLimit,
        }
      }

      return { ...prev, taps: newTaps, score: newScore }
    })
  }

  const resetGame = () => {
    setGameState('idle')
    setStats({
      level: 1,
      score: 0,
      taps: 0,
      targetTaps: LEVEL_CONFIG[0].targetTaps,
      timeLeft: LEVEL_CONFIG[0].timeLimit,
    })
  }

  const getProgressPercentage = () => {
    return (stats.taps / stats.targetTaps) * 100
  }

  const getTimePercentage = () => {
    const currentLevelConfig = LEVEL_CONFIG[stats.level - 1]
    return (stats.timeLeft / currentLevelConfig.timeLimit) * 100
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎮 Tap Tap Game</h2>
      <p style={styles.subtitle}>Tap the button to earn points! Complete all 10 levels!</p>

      {gameState === 'idle' && (
        <div style={styles.startScreen}>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>High Score</div>
            <div style={styles.statValue}>{highScore.toLocaleString()} pts</div>
          </div>
          <button onClick={startGame} style={styles.startButton}>
            Start Game
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div style={styles.gameArea}>
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>Level</div>
              <div style={styles.statValue}>{stats.level}/{TOTAL_LEVELS}</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>Score</div>
              <div style={styles.statValue}>{stats.score.toLocaleString()}</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>Time</div>
              <div style={styles.statValue}>{stats.timeLeft}s</div>
            </div>
          </div>

          <div style={styles.progressSection}>
            <div style={styles.progressLabel}>
              Progress: {stats.taps} / {stats.targetTaps} taps
            </div>
            <div style={styles.progressBarContainer}>
              <div 
                style={{
                  ...styles.progressBar,
                  width: `${getProgressPercentage()}%`,
                  backgroundColor: getProgressPercentage() === 100 ? '#4CAF50' : '#0052ff',
                }}
              />
            </div>
          </div>

          <div style={styles.timeBarContainer}>
            <div 
              style={{
                ...styles.timeBar,
                width: `${getTimePercentage()}%`,
                backgroundColor: stats.timeLeft < 10 ? '#ff4444' : '#4CAF50',
              }}
            />
          </div>

          <div style={styles.tapButtonContainer}>
            <button
              onClick={handleTap}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              className="tap-button"
              style={styles.tapButton}
            >
              <div style={styles.tapButtonText}>TAP!</div>
              <div style={styles.tapButtonPoints}>
                +{stats.level * 10} pts
              </div>
            </button>
          </div>

          <div style={styles.levelInfo}>
            {stats.taps >= stats.targetTaps - 5 && stats.taps < stats.targetTaps && (
              <div style={styles.warningText}>
                Almost there! {stats.targetTaps - stats.taps} taps remaining!
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'completed' && (
        <div style={styles.endScreen}>
          <div style={styles.congrats}>🎉 Congratulations! 🎉</div>
          <div style={styles.endStats}>
            <div style={styles.endStatRow}>
              <span>Final Score:</span>
              <span style={styles.endStatValue}>{stats.score.toLocaleString()} pts</span>
            </div>
            <div style={styles.endStatRow}>
              <span>Levels Completed:</span>
              <span style={styles.endStatValue}>{TOTAL_LEVELS}/10</span>
            </div>
            {stats.score > highScore && (
              <div style={styles.newRecord}>🏆 New High Score! 🏆</div>
            )}
          </div>
          <button onClick={resetGame} style={styles.playAgainButton}>
            Play Again
          </button>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div style={styles.endScreen}>
          <div style={styles.gameOver}>⏰ Time's Up!</div>
          <div style={styles.endStats}>
            <div style={styles.endStatRow}>
              <span>Level Reached:</span>
              <span style={styles.endStatValue}>{stats.level}</span>
            </div>
            <div style={styles.endStatRow}>
              <span>Final Score:</span>
              <span style={styles.endStatValue}>{stats.score.toLocaleString()} pts</span>
            </div>
            <div style={styles.endStatRow}>
              <span>Taps Completed:</span>
              <span style={styles.endStatValue}>{stats.taps}/{stats.targetTaps}</span>
            </div>
            {stats.score > highScore && (
              <div style={styles.newRecord}>🏆 New High Score! 🏆</div>
            )}
          </div>
          <button onClick={resetGame} style={styles.playAgainButton}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '2rem',
    opacity: 0.9,
    fontSize: '1rem',
  },
  startScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  gameArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  statBox: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '1rem',
    borderRadius: '12px',
    textAlign: 'center',
    minWidth: '100px',
    backdropFilter: 'blur(10px)',
  },
  statLabel: {
    fontSize: '0.875rem',
    opacity: 0.8,
    marginBottom: '0.5rem',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  progressSection: {
    marginTop: '1rem',
  },
  progressLabel: {
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    transition: 'width 0.3s ease',
    borderRadius: '12px',
  },
  timeBarContainer: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  timeBar: {
    height: '100%',
    transition: 'width 1s linear',
    borderRadius: '4px',
  },
  tapButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  tapButton: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.1s ease',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  tapButtonText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
  },
  tapButtonPoints: {
    fontSize: '1rem',
    opacity: 0.9,
  },
  levelInfo: {
    textAlign: 'center',
    minHeight: '30px',
  },
  warningText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    animation: 'pulse 1s infinite',
  },
  endScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  congrats: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameOver: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  endStats: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '1.5rem',
    borderRadius: '12px',
    minWidth: '300px',
    backdropFilter: 'blur(10px)',
  },
  endStatRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },
  endStatValue: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  newRecord: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#FFD700',
  },
  startButton: {
    padding: '1rem 3rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
  },
  playAgainButton: {
    padding: '1rem 3rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
  },
}

