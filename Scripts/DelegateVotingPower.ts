import { messagePrefix } from "@ethersproject/hash";
import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

async function main() {   
  const accounts = await ethers.getSigners();

  //Deploy the contract
  const contractFactory = new MyToken__factory(accounts[0]);
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Token contract deployed at ${contract.address}\n`);

 
 //Delegate Voting Power to an address including ones' self
 const delegateTx = await contract.connect(accounts[1]).delegate(accounts[1].address);
 await delegateTx.wait();
 console.log(`Account ${accounts[1].address} has been delegated Voting Power`)

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}