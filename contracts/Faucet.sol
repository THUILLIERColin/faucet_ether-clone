// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Faucet {
  address private owner;
  uint256 private constant REWARD_THRESHOLD = 5;
  mapping(address => uint256) private lastRequest;
  mapping(address => uint256) private requestCount;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
  }

  /**
   * @dev Request 1 ether from the faucet
   * @notice The faucet will only send 1 ether if the balance is greater than 0.001 ether
   */
  function requestEther() external {
    if (lastRequest[msg.sender] == 0) {
      lastRequest[msg.sender] = block.timestamp;
    } else {
      require(
        lastRequest[msg.sender] + 1 hours <= block.timestamp,
        "You can only request Ether once per hour"
      );
    }
    require(address(this).balance >= 0.001 ether, "Insufficient balance in the faucet");

    uint256 amount = 0.001 ether;
    requestCount[msg.sender] += 1;
    if (requestCount[msg.sender] % REWARD_THRESHOLD == 0) {
      amount = 0.002 ether;
    }
    lastRequest[msg.sender] = block.timestamp;
    payable(msg.sender).transfer(amount);
  }

  /// @notice Withdraw the balance of the faucet
  function withdraw() external onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }

  receive() external payable {
    
  }
}
