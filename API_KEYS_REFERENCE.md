# 🔑 API Keys Reference

## BaseScan/Etherscan API Key

**Your API Key:** `IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI`

### 📊 API Key Statistics & Usage

**View your API key usage and statistics:**
- **Stats Dashboard**: https://etherscan.io/myapikey_stats?apikey=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI

This link shows:
- API call usage
- Rate limits
- Daily/monthly statistics
- Request history

### Where It's Used

The API key is configured in:
- `hardhat.config.js` - For contract verification on BaseScan
- `contracts/hardhat.config.js` - For contract verification

### Environment Variable

Add to your `.env` file:
```env
BASESCAN_API_KEY=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
```

---

## Alchemy RPC URL

**Your RPC URL:** `https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj`

### Where It's Used

Configured in:
- `components/OnchainKitProvider.tsx` - Frontend wallet connections
- `hardhat.config.js` - Contract deployment/verification
- `contracts/hardhat.config.js` - Contract operations

### Environment Variables

```env
BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/skI70Usmhsnf0GDuGdYqj
```

---

## Quick Links

- **BaseScan API Key Stats**: https://etherscan.io/myapikey_stats?apikey=IM6NVT4S5QHBX15YXBM274QF27GFG1DSUI
- **BaseScan API Docs**: https://basescan.org/apis
- **BaseScan Home**: https://basescan.org

---

## 💡 Tips

1. **Monitor API Usage**: Check the stats dashboard regularly to track usage
2. **Rate Limits**: Free tier has rate limits - check the dashboard for details
3. **Upgrade**: If you hit limits, consider upgrading your BaseScan API plan

