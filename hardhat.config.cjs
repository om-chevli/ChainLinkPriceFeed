require("@nomicfoundation/hardhat-toolbox");

//require("@nomiclabs/hardhat-ethers")
require("dotenv").config();

const FUJI_RPC_URL =
  process.env.QUICKNODE_ENDPOINT ||
  "https://eth-rinkeby.alchemyapi.io/v2/your-api-key";
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "abcdef";

module.exports = {
  defaultNetwork: "fuji",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    fuji: {
      url: FUJI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },

  solidity: "0.8.21",
};
