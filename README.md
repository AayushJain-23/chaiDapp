# chaiDapp
# Buy Me a Chai 
*Full-Stack Dapp using Solidity, Ether.js, Hardhat, and React JS*

This contract allows users to send Ether along with their name and a short message, as a way to support the contract owner. All messages are stored on-chain using a struct, and can be retrieved publicly.

---

## Contract Overview

# Memo Struct
```
struct Memo {
    string name;
    string message;
    uint256 timestamp;
    address from;
}
```
-> Used to store the name, message, time, and sender's address for each transaction.

---

# State Variables
```
Memo[] memos;
address payable owner;
```
 `memos`: dynamic array that holds all Memo entries. 
 
 `owner`: receives all Ether sent by users.

---

# Constructor
```
constructor() {
    owner = payable(msg.sender);
}
```
 -> Sets the contract deployer as the owner.

---

# buyChai Function

```
function buyChai(string memory name, string memory message) public payable
```

-> Requires the user to send some Ether (`msg.value > 0`).

-> Transfers the Ether to the owner.

-> Stores the Memo with name, message, timestamp, and sender address.

---

# getMemos Function
```
function getMemos() public view returns (Memo[] memory)
```
-> Returns the list of all Memo structs stored so far.

---

# How to Use

1. Deploy the contract on Remix or a testnet.
2. Call `buyChai()` with a name, message, and some Ether.
3. Use `getMemos()` to fetch and display the stored messages.

---

-- License --

MIT

---

  -> Author -<

Aayush Jain
   

