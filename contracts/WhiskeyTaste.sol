pragma solidity ^0.4.2;

contract WhiskeyTaste {
    //Object to identify a Taste 
    address taster;
    address supplier;
    int paid = 0;
    string whiskeyID;
    uint price;

	constructor (address tasterID, address supplierID, string whiskeyid, uint priceValue) public {
        supplier = supplierID;
        whiskeyID = whiskeyid;
        price = priceValue;
        taster = tasterID;
    }

    //Method to be called from supplier that whiskey has been paid and so contract is fullfilled
    function whiskeyTastePaid(address sender) {
        if (sender == supplier) {
            paid = 1;
        }
	}
}
