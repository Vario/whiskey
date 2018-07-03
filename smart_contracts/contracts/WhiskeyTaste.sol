pragma solidity ^0.4.2;

contract WhiskeyTaste {
    //Object to identify a Taste 
    address creator;
    address taster;
    address supplier;
    int paid = 0;
    string whiskeyID;
    uint price;

	function WhiskeyTaste(address supplierid, string whiskeyid, uint priceValue) public {
        creator = msg.sender;
        supplier = supplierid;
        whiskeyID = whiskeyid;
        price = priceValue;
        taster = msg.sender;
    }
    
    //Method to be called from supplier that whiskey has been paid and so contract is fullfilled
    function whiskeyTastePaid() public {
        if (msg.sender == supplier) {
            paid = 1;
        }
	}
}
