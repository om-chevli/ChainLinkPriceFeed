const hre = require("hardhat");

async function main() {
  const ChainLinkPriceFeed = await hre.ethers.getContractFactory(
    "PriceFeed"
  );
  
  const deployedContract = await ChainLinkPriceFeed.deploy();

  console.log(`Contract deployed to: ${deployedContract.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
