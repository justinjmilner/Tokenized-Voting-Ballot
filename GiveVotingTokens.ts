import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10");

async function main() {   
  const accounts = await ethers.getSigners();

//Deploy the contract
  const contractFactory = new MyToken__factory(accounts[0]);
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Token contract deployed at ${contract.address}\n`);


//Mint some tokens from the OG contract to a new address
const mintTx = await contract.mint(accounts[1].address, MINT_VALUE);
await mintTx.wait();
console.log(
  `Minted ${MINT_VALUE.toString()} decimal units to account ${
    accounts[1].address
  }\n`
);
const balanceBN = await contract.balanceOf(accounts[1].address);
console.log(
  `Account ${
    accounts[1].address
  } has ${balanceBN.toString()} decimal units of MyToken\n`
);

 // Transfer tokens from account 1 to another account
 const transferTx = await contract
 .connect(accounts[1])
 .transfer(accounts[2].address, MINT_VALUE.div(2));
await transferTx.wait();

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}