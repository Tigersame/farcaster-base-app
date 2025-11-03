const hre = require("hardhat");

async function main() {
  console.log("Deploying BaseTap contract...");

  const BaseTap = await hre.ethers.getContractFactory("BaseTap");
  const baseTap = await BaseTap.deploy();

  await baseTap.waitForDeployment();

  const address = await baseTap.getAddress();
  console.log("BaseTap deployed to:", address);
  console.log("Token Name: BaseTap");
  console.log("Token Symbol: BASETAP");
  console.log("Total Supply: 100,000,000,000 BASETAP");
  console.log("Reward per level: 10,000 BASETAP");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

