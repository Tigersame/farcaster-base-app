'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract, useChainId } from 'wagmi'

// Simple utility function to avoid viem import issues
const formatUnits = (value: bigint, decimals: number): string => {
  const divisor = BigInt(10) ** BigInt(decimals)
  const integerPart = value / divisor
  const fractionalPart = value % divisor
  if (fractionalPart === BigInt(0)) {
    return integerPart.toString()
  }
  return `${integerPart}.${fractionalPart.toString().padStart(decimals, '0')}`
}

// Define chains locally to avoid import issues
const base = { id: 8453, name: 'Base' }
const baseSepolia = { id: 84532, name: 'Base Sepolia' }

// BaseTap Contract ABI
const BASETAP_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'level', type: 'uint256' }],
    name: 'claimLevelReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256[]', name: 'levels', type: 'uint256[]' }],
    name: 'claimMultipleLevels',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'player', type: 'address' },
      { internalType: 'uint256', name: 'level', type: 'uint256' },
    ],
    name: 'hasClaimedLevel',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'player', type: 'address' },
      { internalType: 'uint256[]', name: 'completedLevels', type: 'uint256[]' },
    ],
    name: 'getClaimableReward',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REWARD_PER_LEVEL',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// Contract addresses for different networks
const CONTRACT_ADDRESSES = {
  [baseSepolia.id]: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA || '0xAa511Ffdf6492c61cE4f6E3b9d6088B2795a0f21') as `0x${string}`,
  [base.id]: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || '0x2e0c500476b6f45886259f8e97fcf93fa800ee78') as `0x${string}`,
} as const

export function useBaseTapContract() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [claimingLevel, setClaimingLevel] = useState<number | null>(null)
  
  // Get contract address for current chain
  const CONTRACT_ADDRESS = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] || CONTRACT_ADDRESSES[baseSepolia.id]
  const isMainnet = chainId === base.id
  const isTestnet = chainId === baseSepolia.id
  const isContractDeployed = CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000' && CONTRACT_ADDRESS.length > 0

  // Write contract for claiming rewards
  const { 
    writeContract, 
    data: hash, 
    isPending: isClaiming,
    error: claimError 
  } = useWriteContract()

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Read token balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BASETAP_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected && isContractDeployed,
    },
  })

  // Read reward per level
  const { data: rewardPerLevel, error: rewardError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BASETAP_ABI,
    functionName: 'REWARD_PER_LEVEL',
    query: {
      enabled: isContractDeployed,
    },
  })

  // Check if level is claimed
  const checkLevelClaimed = (level: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: BASETAP_ABI,
      functionName: 'hasClaimedLevel',
      args: address && level ? [address, BigInt(level)] : undefined,
      query: {
        enabled: !!address && isConnected && !!level && isContractDeployed,
      },
    })
  }

  // Claim single level reward
  const claimLevel = async (level: number) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first')
    }

    if (!isContractDeployed) {
      const networkName = isMainnet ? 'Base Mainnet' : 'Base Sepolia'
      throw new Error(`Contract not deployed on ${networkName}. Please deploy the contract first.`)
    }

    setClaimingLevel(level)
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: BASETAP_ABI,
        functionName: 'claimLevelReward',
        args: [BigInt(level)],
      })
    } catch (error) {
      setClaimingLevel(null)
      throw error
    }
  }

  // Claim multiple levels at once
  const claimMultipleLevels = async (levels: number[]) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first')
    }

    if (!isContractDeployed) {
      const networkName = isMainnet ? 'Base Mainnet' : 'Base Sepolia'
      throw new Error(`Contract not deployed on ${networkName}. Please deploy the contract first.`)
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: BASETAP_ABI,
        functionName: 'claimMultipleLevels',
        args: [levels.map((l) => BigInt(l))],
      })
    } catch (error) {
      throw error
    }
  }

  // Reset claiming state after successful transaction
  if (isSuccess && claimingLevel !== null) {
    setClaimingLevel(null)
    refetchBalance()
  }

  const tokenBalance = balance ? formatUnits(balance, 18) : '0'
  // Default to 10000 tokens (10,000 * 10^18) if contract read fails
  const rewardAmount = rewardPerLevel ? formatUnits(rewardPerLevel, 18) : '10000'

  return {
    contractAddress: CONTRACT_ADDRESS,
    chainId,
    isMainnet,
    isTestnet,
    isContractDeployed,
    claimLevel,
    claimMultipleLevels,
    isClaiming: isClaiming || isConfirming,
    isSuccess,
    claimError,
    tokenBalance,
    rewardAmount,
    claimingLevel,
    checkLevelClaimed,
    refetchBalance,
  }
}

