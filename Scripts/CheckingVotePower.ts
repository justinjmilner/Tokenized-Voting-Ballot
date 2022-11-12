import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

async function main() {   
  const accounts = await ethers.getSigners();

//Deploy the contract
  const contractFactory = new MyToken__factory(accounts[0]);
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Token contract deployed at ${contract.address}\n`);

//Check the voting power for accounts 0
 const votes = await contract.getVotes(accounts[0].address);
 console.log(
   `Account ${
     accounts[0].address
   } has ${votes.toString()} units of voting power before self delegating\n`
 );

//Check the voting power for accounts 1 and beyond..
 const votesAcc1 = await contract.getVotes(accounts[1].address);
 console.log(
   `Account ${
     accounts[1].address
   } has ${votes.toString()} units of voting power before self delegating\n`
 );

//Check the voting power after minting (AKA transfering from OG contract) to account 1
const votes1AfterTransfer = await contract.getVotes(accounts[1].address);
console.log(
  `Account ${
    accounts[1].address
  } has ${votes1AfterTransfer.toString()} units of voting power after transfer\n`
);

//Check the voting power after transfering tokens to account 2 or beyond...
const votes2AfterTransfer = await contract.getVotes(accounts[2].address);
console.log(
 `Account ${
   accounts[2].address
 } has ${votes2AfterTransfer.toString()} units of voting power after transfer\n`
);

//Check voting power for an account at a previous block
const lastBlock = await ethers.provider.getBlock("latest")
console.log(`Current block number is ${lastBlock.number}\n`);
const pastVotes = await contract.getPastVotes(accounts[1].address, lastBlock.number -1);
console.log(
   `Account 
    ${accounts[1].address} had 
    ${pastVotes.toString()} units of voting power at the previous block\n`
);
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });