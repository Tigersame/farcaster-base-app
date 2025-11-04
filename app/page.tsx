'use client'

import { useEffect, useState } from 'react'
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'
import { useBaseWallet } from '@/hooks/useBaseWallet'
import { useBaseTapContract } from '@/hooks/useBaseTapContract'
import { TapTapGame } from '@/components/TapTapGame'
import { useChainId } from 'wagmi'

// Define chains locally to avoid import issues
const baseChain = {
  id: 8453,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://mainnet.base.org'] },
    public: { http: ['https://mainnet.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://basescan.org' },
  },
  testnet: false,
}

const baseSepoliaChain = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
    public: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Basescan', url: 'https://sepolia.basescan.org' },
  },
  testnet: true,
}

export default function Home() {
  const { sdk, isReady } = useFarcasterSDK()
  const { address, connectWallet, disconnectWallet, isConnected, isConnecting, error } = useBaseWallet()
  const { isMainnet, isTestnet, isContractDeployed, chainId } = useBaseTapContract()
  const chainIdFromWagmi = useChainId()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  
  const currentChainId = chainId || chainIdFromWagmi
  const isOnMainnet = currentChainId === baseChain.id
  const isOnTestnet = currentChainId === baseSepoliaChain.id
  const networkName = isOnMainnet ? 'Base Mainnet' : isOnTestnet ? 'Base Sepolia Testnet' : 'Unknown Network'

  useEffect(() => {
    setMounted(true)
  }, [])

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
        <div style={{ marginBottom: '0.75rem' }}>
          <p>Status: {!mounted ? <span style={{ color: '#666' }}>Loading...</span> : (isConnected ? <span style={{ color: '#4CAF50' }}>✅ Connected</span> : <span style={{ color: '#ff4444' }}>❌ Not Connected</span>)}</p>
          {isConnected && (
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#666' }}>
              Network: <strong style={{ color: isOnMainnet ? '#4CAF50' : isOnTestnet ? '#0052ff' : '#ff4444' }}>{networkName}</strong> (Chain ID: {currentChainId})
            </p>
          )}
          {isConnected && isOnMainnet && !isContractDeployed && (
            <div style={{ 
              marginTop: '0.75rem', 
              padding: '0.75rem', 
              background: '#fff3cd', 
              border: '1px solid #ffc107', 
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              ⚠️ <strong>Contract not deployed on Base Mainnet.</strong> Deploy using: <code style={{ background: '#f5f5f5', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>npm run deploy:base</code>
            </div>
          )}
          {isConnected && isOnMainnet && isContractDeployed && (
            <div style={{ 
              marginTop: '0.75rem', 
              padding: '0.75rem', 
              background: '#d4edda', 
              border: '1px solid #4CAF50', 
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              ✅ <strong>Contract deployed on Base Mainnet!</strong>
            </div>
          )}
        </div>
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
                onClick={() => connectWallet('smartwallet')}
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
                {isConnecting ? 'Connecting...' : '🔷 Base Smart Wallet'}
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
              💡 Don&apos;t have a wallet? Try <strong>Base Smart Wallet</strong> (no extension needed!) or install <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" style={{ color: '#0052ff' }}>MetaMask</a> / <a href="https://www.coinbase.com/wallet" target="_blank" rel="noopener noreferrer" style={{ color: '#0052ff' }}>Coinbase Wallet</a>
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

