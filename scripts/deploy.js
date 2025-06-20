// const hre = require("hardhat");

// async function getBalances(address) {
//   const balanceBigInt = await hre.ethers.provider.getBalance(address);
//   return hre.ethers.utils.formatEther(balanceBigInt);
// }

// async function cosoleBalances(addresses) {
//   let counter = 0;
//   for (const address of addresses) {
//     console.log(`Address ${counter} balance:`, await getBalances(address));
//     counter++;
//   }
// }

// async function consoleMemos(memos) {
//   for (const memo of memos) {
//     const timestamp = memo.timestamp;
//     const name = memo.name;
//     const from = memo.from;
//     const message = memo.message;
//     console.log(
//       `At ${timestamp},name ${name},address ${from},message ${message}`
//     );
//   }
// }

// async function main() {
//   const [owner, from1, from2, from3] = await hre.ethers.getSigners();
//   const chai = await hre.ethers.getContractFactory("chai");
//   const contract = await chai.deploy(); //instance of contract

//   //await contract.deployed();
//   await contract.waitForDeployment();

//   console.log("Address of contract:", contract.address);

//   const addresses = [
//     owner.address,
//     from1.address,
//     from2.address,
//     from3.address,
//   ];
//   console.log("Before buying chai");
//   await cosoleBalances(addresses);

//   const amount = { value: hre.ethers.utils.parseEther("1") };
//   await contract.connect(from1).buyChai("from1", "Very nice chai", amount);
//   await contract.connect(from2).buyChai("from2", "Very nice course", amount);
//   await contract
//     .connect(from3)
//     .buyChai("from3", "Very nice information", amount);

//   console.log("After buying chai");
//   await cosoleBalances(addresses);

//   const memos = await contract.getMemos();
//   consoleMemos(memos);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });



//The code below is changed into ether.js v6
const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt); // In v6 'utils' are removed
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    const balance = await getBalances(address);
    console.log(`Address ${counter} balance:`, balance);
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, name: ${name}, address: ${from}, message: ${message}`);
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const Chai = await hre.ethers.getContractFactory("chai");
  const contract = await Chai.deploy();

  await contract.waitForDeployment(); // v6: deployed() removed
  console.log("Address of contract:", await contract.getAddress());

  const addresses = [
    await owner.getAddress(),
    await from1.getAddress(),
    await from2.getAddress(),
    await from3.getAddress()
  ];

  console.log("Before buying chai");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") }; // v6: parseEther directly on ethers

  await contract.connect(from1).buyChai("from1", "Very nice chai", amount);
  await contract.connect(from2).buyChai("from2", "Very nice course", amount);
  await contract.connect(from3).buyChai("from3", "Very nice information", amount);

  console.log("After buying chai");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  await consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
