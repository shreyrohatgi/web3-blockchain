pragma solidity ^0.4.26;

contract A {
    address public deployedContractAddress;

    function setAddressB(address _addressB) public {
        deployedContractAddress = _addressB;
    }

    function getStringFromAnotherContract() public view returns (string) {
        B b = B(deployedContractAddress);
        return b.getMessage();
    }

    function setStringInAnotherContract(string _input) public {
        B b = B(deployedContractAddress);
        b.setMessage(_input);
    }
}

contract B {
    string randomMsg;

    function setMessage(string _input) public {
        randomMsg = _input;
    }

    function getMessage() public view returns (string) {
        return randomMsg;
    }
}
