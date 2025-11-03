'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'

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

// Contract address - UPDATE THIS AFTER DEPLOYMENT
// For now, using a placeholder - you'll need to deploy and update this
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}` || '0x0000000000000000000000000000000000000000'

export function useBaseTapContract() {
  const { address, isConnected } = useAccount()
  const [claimingLevel, setClaimingLevel] = useState<number | null>(null)

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
      enabled: !!address && isConnected,
    },
  })

  // Read reward per level
  const { data: rewardPerLevel } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: BASETAP_ABI,
    functionName: 'REWARD_PER_LEVEL',
    query: {
      enabled: !!CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
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
        enabled: !!address && isConnected && !!level,
      },
    })
  }

  // Claim single level reward
  const claimLevel = async (level: number) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first')
    }

    if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      throw new Error('Contract not deployed. Please deploy the contract first.')
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

    if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      throw new Error('Contract not deployed. Please deploy the contract first.')
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
  const rewardAmount = rewardPerLevel ? formatUnits(rewardPerLevel, 18) : '10000'

  return {
    contractAddress: CONTRACT_ADDRESS,
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

