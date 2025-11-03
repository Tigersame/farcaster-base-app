// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BaseTap
 * @dev ERC20 token for Base Tap Game
 * Rewards players with tokens when they complete game levels
 */
contract BaseTap is ERC20, Ownable {
    // Reward amount per level completion
    uint256 public constant REWARD_PER_LEVEL = 10000 * 10**18; // 10,000 tokens per level
    
    // Mapping to track claimed levels for each player
    mapping(address => mapping(uint256 => bool)) public claimedLevels;
    
    // Total levels in the game
    uint256 public constant TOTAL_LEVELS = 10;
    
    // Event emitted when tokens are claimed for a level
    event LevelRewardClaimed(address indexed player, uint256 level, uint256 amount);
    
    constructor() ERC20("BaseTap", "BASETAP") Ownable(msg.sender) {
        // Total supply: 100,000,000,000 tokens (100 billion)
        uint256 totalSupply_ = 100000000000 * 10**18;
        _mint(msg.sender, totalSupply_);
    }
    
    /**
     * @dev Claim reward for completing a level
     * @param level The level number completed (1-10)
     */
    function claimLevelReward(uint256 level) external {
        require(level >= 1 && level <= TOTAL_LEVELS, "Invalid level");
        require(!claimedLevels[msg.sender][level], "Level reward already claimed");
        
        // Mark level as claimed
        claimedLevels[msg.sender][level] = true;
        
        // Transfer reward tokens to player
        _transfer(owner(), msg.sender, REWARD_PER_LEVEL);
        
        emit LevelRewardClaimed(msg.sender, level, REWARD_PER_LEVEL);
    }
    
    /**
     * @dev Claim rewards for multiple levels at once
     * @param levels Array of level numbers to claim
     */
    function claimMultipleLevels(uint256[] calldata levels) external {
        uint256 totalReward = 0;
        
        for (uint256 i = 0; i < levels.length; i++) {
            uint256 level = levels[i];
            require(level >= 1 && level <= TOTAL_LEVELS, "Invalid level");
            require(!claimedLevels[msg.sender][level], "Level reward already claimed");
            
            claimedLevels[msg.sender][level] = true;
            totalReward += REWARD_PER_LEVEL;
            
            emit LevelRewardClaimed(msg.sender, level, REWARD_PER_LEVEL);
        }
        
        require(totalReward > 0, "No valid levels to claim");
        _transfer(owner(), msg.sender, totalReward);
    }
    
    /**
     * @dev Check if a level has been claimed by a player
     * @param player Address of the player
     * @param level Level number to check
     * @return bool True if level has been claimed
     */
    function hasClaimedLevel(address player, uint256 level) external view returns (bool) {
        return claimedLevels[player][level];
    }
    
    /**
     * @dev Get total claimable reward for a player based on completed levels
     * @param player Address of the player
     * @param completedLevels Array of completed level numbers
     * @return uint256 Total claimable reward amount
     */
    function getClaimableReward(address player, uint256[] calldata completedLevels) 
        external 
        view 
        returns (uint256) 
    {
        uint256 claimable = 0;
        
        for (uint256 i = 0; i < completedLevels.length; i++) {
            uint256 level = completedLevels[i];
            if (level >= 1 && level <= TOTAL_LEVELS && !claimedLevels[player][level]) {
                claimable += REWARD_PER_LEVEL;
            }
        }
        
        return claimable;
    }
    
    /**
     * @dev Get player's token balance
     * @param player Address of the player
     * @return uint256 Token balance
     */
    function getPlayerBalance(address player) external view returns (uint256) {
        return balanceOf(player);
    }
}

