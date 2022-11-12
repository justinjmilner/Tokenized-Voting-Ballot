import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config()

async function main() {   
  const accounts = await ethers.getSigners();

 //Deploy the contract
 const contractFactory = new MyToken__factory(accounts[0]);
 const contract = await contractFactory.deploy();
 await contract.deployed();
 console.log(`Token contract deployed at ${contract.address}\n`);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    const signer = wallet.connect(provider);
    const ballotContractFactory = new MyToken__factory(signer);
    const ballotContract = ballotContractFactory.attach(
      contractAddress
    );
    const tx = await contractFactory.winnerName(); 
    const tx1 = await contractFactory.winningProposal();
    console.log("The winning proposal is:");
    console.log(tx);
    console.log("The winning proposal has the following # of votes:");
    console.log(tx1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});