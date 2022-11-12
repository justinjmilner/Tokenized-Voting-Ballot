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
const proposalIndex = process.argv[3];
const amount = await contract.balanceOf(accounts[1].address);
const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
const signer = wallet.connect(provider);
const ballotContractFactory = new MyToken__factory(signer);
    const ballotContract = ballotContractFactory.attach(
      contractAddress
    );
const tx = await ballotContract.vote(proposalIndex, amount);
tx.wait();
console.log(`You have succesfully voted for the porposal: ${proposalIndex} `)
    }


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
