pragma solidity ^0.4.2;

//Contract WhiskeyTaste
contract WhiskeyTaste {
    //Address of the Creator of the Contract
    address creator;
    //Address of the Taster of the Whiskey
    address taster;
    //Address of the Supplier of the Whiskey
    address supplier;
    //Flag whether a whiskey taste has been paid
    int paid = 0;
    //ID of the Whiskey in our outsourced database
    string whiskeyID;
    //Price for the Whiskey taste
    uint price;

  //constructor
	function WhiskeyTaste(address supplierid, string whiskeyid, uint priceValue) public {
        creator = msg.sender;
        supplier = supplierid;
        whiskeyID = whiskeyid;
        price = priceValue;
        taster = msg.sender;
    }

    //Method to be called from supplier that whiskey has been paid and consequently the contract is closed
    function whiskeyTastePaid() public {
        if (msg.sender == supplier) {
            paid = 1;
        }
	}
}

