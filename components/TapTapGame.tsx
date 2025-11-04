'use client'

import { useState, useEffect } from 'react'
import { useBaseTapContract } from '@/hooks/useBaseTapContract'

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
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const { claimLevel, tokenBalance, rewardAmount, isClaiming, isSuccess, claimError } = useBaseTapContract()

  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('tapGameHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10))
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (gameState === 'playing' && stats.timeLeft > 0) {
      interval = setInterval(() => {
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
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
      if (timer) {
        clearInterval(timer as any)
        setTimer(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, stats.timeLeft])

  const startGame = () => {
    setGameState('playing')
    setCompletedLevels([])
    setStats({
      level: 1,
      score: 0,
      taps: 0,
      targetTaps: LEVEL_CONFIG[0]!.targetTaps,
      timeLeft: LEVEL_CONFIG[0]!.timeLimit,
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

        // Level up! Track completed level
        const currentLevel = prev.level
        setCompletedLevels((prev) => [...prev, currentLevel])
        const levelConfig = LEVEL_CONFIG[nextLevel - 1]!
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
  
  const handleClaimLevel = async (level: number) => {
    try {
      await claimLevel(level)
    } catch (error: any) {
      console.error('Failed to claim level:', error)
      alert(error?.message || 'Failed to claim tokens. Please try again.')
    }
  }

  const resetGame = () => {
    setGameState('idle')
    setStats({
      level: 1,
      score: 0,
      taps: 0,
      targetTaps: LEVEL_CONFIG[0]!.targetTaps,
      timeLeft: LEVEL_CONFIG[0]!.timeLimit,
    })
  }

  const getProgressPercentage = () => {
    return (stats.taps / stats.targetTaps) * 100
  }

  const getTimePercentage = () => {
    const currentLevelConfig = LEVEL_CONFIG[stats.level - 1]!
    return (stats.timeLeft / currentLevelConfig.timeLimit) * 100
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎮 Tap Tap Game</h2>
      <p style={styles.subtitle}>Tap the button to earn points! Complete all 10 levels!</p>

      {gameState === 'idle' && (
        <div style={styles.startScreen}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <div style={styles.statBox}>
              <div style={styles.statLabel}>High Score</div>
              <div style={styles.statValue}>{highScore.toLocaleString()} pts</div>
            </div>
            {tokenBalance && !isNaN(parseFloat(tokenBalance)) && parseFloat(tokenBalance) > 0 && (
              <div style={{...styles.statBox, background: 'rgba(255, 215, 0, 0.3)'}}>
                <div style={styles.statLabel}>BASETAP Balance</div>
                <div style={{...styles.statValue, fontSize: '1.2rem'}}>
                  {parseFloat(tokenBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            )}
            <div style={{...styles.statBox, background: 'rgba(76, 175, 80, 0.2)'}}>
              <div style={styles.statLabel}>Reward per Level</div>
              <div style={{...styles.statValue, fontSize: '1.1rem'}}>
                {rewardAmount && !isNaN(parseFloat(rewardAmount)) ? parseFloat(rewardAmount).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '10,000'} BASETAP
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', opacity: 0.85 }}>
            <p>🎁 Complete all 10 levels to earn up to {(rewardAmount && !isNaN(parseFloat(rewardAmount)) ? parseFloat(rewardAmount) : 10000) * TOTAL_LEVELS} BASETAP tokens!</p>
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
            {completedLevels.length > 0 && (
              <div style={{...styles.statBox, background: 'rgba(76, 175, 80, 0.3)'}}>
                <div style={styles.statLabel}>Rewards</div>
                <div style={styles.statValue}>{completedLevels.length}</div>
              </div>
            )}
            {tokenBalance && !isNaN(parseFloat(tokenBalance)) && parseFloat(tokenBalance) > 0 && (
              <div style={{...styles.statBox, background: 'rgba(255, 215, 0, 0.3)'}}>
                <div style={styles.statLabel}>BASETAP</div>
                <div style={{...styles.statValue, fontSize: '1.1rem'}}>
                  {parseFloat(tokenBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            )}
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
              <svg 
                width="140" 
                height="140" 
                viewBox="0 0 120 120" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={styles.baseLogo}
              >
                <rect x="0" y="0" width="120" height="120" rx="20" fill="url(#baseGradient)"/>
                <path 
                  d="M30 30L60 60L30 90L30 30Z" 
                  fill="white" 
                  opacity="0.95"
                />
                <path 
                  d="M90 30L60 60L90 90L90 30Z" 
                  fill="white" 
                  opacity="0.95"
                />
                <path 
                  d="M30 60L60 90L90 60L60 30L30 60Z" 
                  fill="white" 
                  opacity="0.7"
                />
                <rect x="45" y="45" width="30" height="30" rx="4" fill="url(#baseGradient)"/>
                <defs>
                  <linearGradient id="baseGradient" x1="0" y1="0" x2="120" y2="120">
                    <stop offset="0%" stopColor="#0052FF"/>
                    <stop offset="50%" stopColor="#0039CC"/>
                    <stop offset="100%" stopColor="#002699"/>
                  </linearGradient>
                </defs>
              </svg>
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
          
          {/* Reward Portal - Always visible when there are completed levels */}
          {completedLevels.length > 0 && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(76, 175, 80, 0.15)', 
              borderRadius: '12px',
              border: '2px solid rgba(76, 175, 80, 0.5)'
            }}>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', textAlign: 'center' }}>
                💰 {completedLevels.length} Level{completedLevels.length > 1 ? 's' : ''} Completed - Claim {rewardAmount && !isNaN(parseFloat(rewardAmount)) ? parseFloat(rewardAmount).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '10,000'} BASETAP per level!
              </h3>
              <p style={{ fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.75rem', opacity: 0.9 }}>
                Total Reward: {rewardAmount && !isNaN(parseFloat(rewardAmount)) ? (parseFloat(rewardAmount) * completedLevels.length).toLocaleString(undefined, { maximumFractionDigits: 0 }) : (10000 * completedLevels.length).toLocaleString()} BASETAP
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {completedLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleClaimLevel(level)}
                    disabled={isClaiming}
                    style={{
                      padding: '0.5rem 0.75rem',
                      background: isClaiming ? '#ccc' : '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: isClaiming ? 'not-allowed' : 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                    }}
                  >
                    {isClaiming ? 'Claiming...' : `Level ${level}`}
                  </button>
                ))}
              </div>
              {claimError && (
                <div style={{ 
                  marginTop: '0.75rem', 
                  padding: '0.5rem', 
                  background: 'rgba(255, 0, 0, 0.2)', 
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  textAlign: 'center'
                }}>
                  Error: {claimError.message}
                </div>
              )}
              {isSuccess && (
                <div style={{ 
                  marginTop: '0.75rem', 
                  padding: '0.5rem', 
                  background: 'rgba(76, 175, 80, 0.3)', 
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  textAlign: 'center'
                }}>
                  ✅ Tokens claimed!
                </div>
              )}
            </div>
          )}
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
            <div style={styles.endStatRow}>
              <span>Token Balance:</span>
              <span style={styles.endStatValue}>
                {tokenBalance && !isNaN(parseFloat(tokenBalance)) && parseFloat(tokenBalance) > 0 
                  ? `${parseFloat(tokenBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} BASETAP` 
                  : '0 BASETAP'}
              </span>
            </div>
            {stats.score > highScore && (
              <div style={styles.newRecord}>🏆 New High Score! 🏆</div>
            )}
          </div>
          <div style={{ marginTop: '1.5rem', width: '100%' }}>
            <div style={{ 
              padding: '1.5rem', 
              background: 'rgba(76, 175, 80, 0.2)', 
              borderRadius: '12px',
              marginBottom: '1rem',
              border: '2px solid rgba(76, 175, 80, 0.5)',
              boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)'
            }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bold' }}>💰 Claim Your Rewards!</h3>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.95rem', opacity: 0.95, marginBottom: '0.5rem' }}>
                  Each level completed earns you <strong>{rewardAmount && !isNaN(parseFloat(rewardAmount)) ? parseFloat(rewardAmount).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '10,000'}</strong> BASETAP tokens
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#FFD700' }}>
                  Total Available: {(rewardAmount && !isNaN(parseFloat(rewardAmount)) ? parseFloat(rewardAmount) : 10000) * TOTAL_LEVELS} BASETAP
                </p>
                {tokenBalance && !isNaN(parseFloat(tokenBalance)) && parseFloat(tokenBalance) > 0 && (
                  <p style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.5rem' }}>
                    Current Balance: {parseFloat(tokenBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })} BASETAP
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1).map((level) => (
                  <button
                    key={level}
                    onClick={() => handleClaimLevel(level)}
                    disabled={isClaiming}
                    style={{
                      padding: '0.5rem 1rem',
                      background: isClaiming ? '#ccc' : '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: isClaiming ? 'not-allowed' : 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                    }}
                  >
                    {isClaiming ? 'Claiming...' : `Level ${level}`}
                  </button>
                ))}
              </div>
              {claimError && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem', 
                  background: 'rgba(255, 0, 0, 0.2)', 
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}>
                  Error: {claimError.message}
                </div>
              )}
              {isSuccess && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem', 
                  background: 'rgba(76, 175, 80, 0.2)', 
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}>
                  ✅ Tokens claimed successfully!
                </div>
              )}
            </div>
          </div>
          <button onClick={resetGame} style={styles.playAgainButton}>
            Play Again
          </button>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div style={styles.endScreen}>
          <div style={styles.gameOver}>⏰ Time&apos;s Up!</div>
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
          
          {/* Reward Portal for Completed Levels */}
          {completedLevels.length > 0 && (
            <div style={{ marginTop: '1.5rem', width: '100%' }}>
              <div style={{ 
                padding: '1rem', 
                background: 'rgba(76, 175, 80, 0.2)', 
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '2px solid rgba(76, 175, 80, 0.5)'
              }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>💰 Claim Your Rewards!</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                  You completed {completedLevels.length} level{completedLevels.length > 1 ? 's' : ''}. Claim <strong>{rewardAmount && !isNaN(parseFloat(rewardAmount)) ? parseFloat(rewardAmount).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '10,000'}</strong> BASETAP tokens per level!
                </p>
                <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '1rem' }}>
                  Total Reward: {rewardAmount && !isNaN(parseFloat(rewardAmount)) ? (parseFloat(rewardAmount) * completedLevels.length).toLocaleString(undefined, { maximumFractionDigits: 0 }) : (10000 * completedLevels.length).toLocaleString()} BASETAP
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {completedLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => handleClaimLevel(level)}
                      disabled={isClaiming}
                      style={{
                        padding: '0.5rem 1rem',
                        background: isClaiming ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isClaiming ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                      }}
                    >
                      {isClaiming ? 'Claiming...' : `Level ${level}`}
                    </button>
                  ))}
                </div>
                {claimError && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem', 
                    background: 'rgba(255, 0, 0, 0.2)', 
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    Error: {claimError.message}
                  </div>
                )}
                {isSuccess && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem', 
                    background: 'rgba(76, 175, 80, 0.2)', 
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    ✅ Tokens claimed successfully!
                  </div>
                )}
              </div>
            </div>
          )}
          
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
    background: 'linear-gradient(135deg, #0052FF 0%, #0039CC 100%)',
    border: '4px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0, 82, 255, 0.4)',
    transition: 'transform 0.1s ease',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    padding: '1rem',
    position: 'relative',
  },
  baseLogo: {
    width: '120px',
    height: '120px',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
  },
  tapButtonPoints: {
    fontSize: '1rem',
    opacity: 0.95,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '0.5rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
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

