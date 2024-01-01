

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.3;

contract Sale{
    address payable owner;
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from ;

    }

    event NewPurchase(string name , string message);
    Memo[]  public memos;
    constructor(){
        owner = payable(msg.sender);
    }

modifier onlyOnwer (){
    if(msg.sender != owner)revert();
    _;
}
    function buy(string calldata _name, string calldata _message) external payable {
        if(msg.value < 0.0001 ether)revert();
        memos.push(Memo({
            name : _name, message: _message , timestamp:block.timestamp, from:msg.sender
        }));
        emit NewPurchase({name:_name,message:_message});
    }

    function withdraw() onlyOnwer external {
        (bool success ) = owner.send(address(this).balance);
        require(success);
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }

}