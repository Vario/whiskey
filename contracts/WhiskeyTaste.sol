pragma solidity ^0.4.2;

contract WhiskeyTaste {
    //Object to identify a Taste 
    address taster:
    address supplier;
    int paid = 0;
    string whiskeyID;

	function WhiskeyTaste(string whiskeyId, address whiskeySupplier) {
        taster = msg.sender;
        supplier = whiskeySupplier;
        whiskeyID = whiskeyId;
	}

    //Method to be called from supplier that whiskey has been paid and so contract is fullfilled
    function WhiskeyPaid(address sender) {
        if(sender == supplier) {
            paid = 1;
        }
	}
}
