pragma solidity ^0.4.26;

contract SignatureVerification {
    function getMessageHash(string message) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(message));
    }

    function recover(string message, bytes signature)
        public
        pure
        returns (address)
    {
        bytes32 r;
        bytes32 s;
        uint8 v;

        bytes32 messageHash = getMessageHash(message);
        bytes32 ethSignedMessageHash = toEthSignedMessageHash(messageHash);

        // Check the signature length
        if (signature.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s and v variables with inline assembly.
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            // solium-disable-next-line arg-overflow
            return ecrecover(ethSignedMessageHash, v, r, s);
        }
    }

    function toEthSignedMessageHash(bytes32 hash)
        public
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }
}
