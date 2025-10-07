async function main() {
  const initialSupply = 1000000; // 1 juta token
  
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(initialSupply);

  await myToken.waitForDeployment();

  console.log("MyToken deployed to:", await myToken.getAddress());
  console.log("Total supply:", initialSupply, "MTK tokens");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});