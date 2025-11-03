'use client'

import { useEffect, useState } from 'react'
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'
import { useBaseWallet } from '@/hooks/useBaseWallet'
import { TapTapGame } from '@/components/TapTapGame'

export default function Home() {
  const { sdk, isReady } = useFarcasterSDK()
  const { address, connectWallet, disconnectWallet, isConnected } = useBaseWallet()
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    if (isReady && sdk) {
      // Get user context when SDK is ready
      sdk.context
        .then((context) => {
          setUserInfo(context)
        })
        .catch((error) => {
          console.error('Error getting context:', error)
        })
    }
  }, [isReady, sdk])

  const handleOpenUrl = () => {
    if (sdk) {
      sdk.actions.openUrl('https://base.org')
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Farcaster Base App</h1>
      
      {/* Tap Tap Game */}
      <div style={{ marginBottom: '2rem' }}>
        <TapTapGame />
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
        <h2>Farcaster SDK Status</h2>
        <p>SDK Ready: {isReady ? '✅' : '❌'}</p>
        {userInfo && (
          <div style={{ marginTop: '1rem' }}>
            <h3>User Context:</h3>
            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
              {JSON.stringify(userInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
        <h2>Base Wallet Connection</h2>
        <p>Connected: {isConnected ? '✅' : '❌'}</p>
        {address && <p>Address: {address}</p>}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          {!isConnected ? (
            <button 
              onClick={connectWallet}
              style={{ 
                padding: '0.5rem 1rem', 
                background: '#0052ff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Connect Wallet
            </button>
          ) : (
            <button 
              onClick={disconnectWallet}
              style={{ 
                padding: '0.5rem 1rem', 
                background: '#ff4444', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
        <h2>Actions</h2>
        <button 
          onClick={handleOpenUrl}
          disabled={!isReady}
          style={{ 
            padding: '0.5rem 1rem', 
            background: isReady ? '#0052ff' : '#ccc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isReady ? 'pointer' : 'not-allowed',
            marginTop: '0.5rem'
          }}
        >
          Open Base.org
        </button>
      </div>
    </main>
  )
}

