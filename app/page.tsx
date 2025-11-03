'use client'

import { useEffect, useState } from 'react'
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'
import { useBaseWallet } from '@/hooks/useBaseWallet'
import { TapTapGame } from '@/components/TapTapGame'

export default function Home() {
  const { sdk, isReady } = useFarcasterSDK()
  const { address, connectWallet, disconnectWallet, isConnected, isConnecting, error } = useBaseWallet()
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
        <p>Status: {isConnected ? <span style={{ color: '#4CAF50' }}>✅ Connected</span> : <span style={{ color: '#ff4444' }}>❌ Not Connected</span>}</p>
        {address && (
          <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
            <strong>Address:</strong> 
            <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', wordBreak: 'break-all', marginTop: '0.25rem' }}>
              {address}
            </div>
          </div>
        )}
        {!isConnected && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              Connect your wallet to interact with Base network:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button 
                onClick={() => connectWallet('metamask')}
                disabled={isConnecting}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: isConnecting ? '#ccc' : '#0052ff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
              >
                {isConnecting ? 'Connecting...' : '🦊 MetaMask'}
              </button>
              <button 
                onClick={() => connectWallet('coinbase')}
                disabled={isConnecting}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: isConnecting ? '#ccc' : '#0052ff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
              >
                {isConnecting ? 'Connecting...' : '🪙 Coinbase Wallet'}
              </button>
              <button 
                onClick={() => connectWallet('injected')}
                disabled={isConnecting}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: isConnecting ? '#ccc' : '#0052ff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
              >
                {isConnecting ? 'Connecting...' : '💼 Other Wallet'}
              </button>
            </div>
            {error && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                background: '#ffebee', 
                border: '1px solid #ffcdd2', 
                borderRadius: '4px',
                color: '#c62828',
                fontSize: '0.875rem'
              }}>
                ⚠️ {error}
              </div>
            )}
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#999' }}>
              💡 Don&apos;t have a wallet? Install <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" style={{ color: '#0052ff' }}>MetaMask</a> or <a href="https://www.coinbase.com/wallet" target="_blank" rel="noopener noreferrer" style={{ color: '#0052ff' }}>Coinbase Wallet</a>
            </p>
          </div>
        )}
        {isConnected && (
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={disconnectWallet}
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: '#ff4444', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Disconnect Wallet
            </button>
          </div>
        )}
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

