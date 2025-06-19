// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract chai {


    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }


    Memo[] memos; 
    //Ye ek dynamic array banata hai jisme Memo struct ke objects store hote hain.
    //Yeh line ka kaam hai ek memory box banana jisme users ke "chai messages" store kiye jaate hain.
    //Har baar koi user buyChai() function se chai kharidta hai aur message bhejta hai, tab uska message memos array me add (push) ho jaata hai.


    address payable owner;
    // address of the owner of the Dapp, it will be payable as owner will recive the ethers.

    constructor() {
        owner = payable(msg.sender);
    }

    
    function buyChai(string memory name, string memory message) public payable {
        
        require(msg.value > 0, "Please pay greater than 0 ether");
        //check karna ki jo user chai kharid raha hai, usne kuch Ether bheja hai ya nahi.

        owner.transfer(msg.value);
         //"owner" variable me hi value(ether) store(tranfer) ho jayegi jo hume user(not the owner) dega. 

        memos.push(Memo(name, message, block.timestamp, msg.sender));
        //Is line ka kaam hai ek naya Memo struct banakar usse memos array me store karna.
        //Jab user buyChai() function call karta hai, tab usse diya gaya name aur message, current block ka timestamp, aur msg.sender (yaani sender ka wallet address) liya jaata hai, aur in sab values se ek Memo object banaya jaata hai.
        //Phir push() function ka use karke us Memo ko memos naam ke dynamic array me add kar diya jaata hai.
    }   

    
    
    function getMemos() public view returns (Memo[] memory) {
        return memos;
        // "Memo[] memory" = Ek dynamic array jisme har element 'Memo' struct ka hai, aur ye memory me rakha gaya hai 
        //Memo[] = Ye batata hai ki hum ek array return kar rahe hain
        //Aur us array ke elements ka type hai: Memo (jo ek struct hai jo humne banaya h)
        //Yaani: "Array of Memo structs"
        //Isliye Memo[] likha gaya — jisme Memo struct ka naam hai, aur [] uska array hone ka indication.
    
    }
}