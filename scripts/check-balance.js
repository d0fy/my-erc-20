const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");

  // Cek estimated gas cost untuk deploy
  const MyToken = await ethers.getContractFactory("MyToken");
  const deploymentData = MyToken.getDeployTransaction("1000000");
  const estimatedGas = await ethers.provider.estimateGas(deploymentData);
  const gasPrice = await ethers.provider.getGasPrice();
  const estimatedCost = estimatedGas * gasPrice;

  console.log(
    "Estimated deployment cost:",
    ethers.formatEther(estimatedCost),
    "ETH"
  );
  console.log(
    "You need at least",
    ethers.formatEther(estimatedCost),
    "ETH to deploy"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
