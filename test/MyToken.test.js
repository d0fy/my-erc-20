const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let myToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new MyToken contract before each test
    myToken = await MyToken.deploy(1000000); // 1 juta token
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await myToken.name()).to.equal("MyToken");
      expect(await myToken.symbol()).to.equal("MTK");
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await myToken.transfer(addr1.address, 50);
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await myToken.balanceOf(owner.address);
      
      // Try to send 1 token from addr1 (0 tokens) to owner
      await expect(
        myToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.reverted;

      // Owner balance shouldn't have changed
      expect(await myToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});