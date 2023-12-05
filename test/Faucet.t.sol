// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../contracts/Faucet.sol";

/// @title Tests for Faucet contract
/// @dev Utilizes Forge standard testing framework
/// @notice This contract implements tests for the Faucet contract functionalities
contract FaucetTest is Test {
  Faucet faucet;

  address admin = address(0x123);
  address once_user = address(0x456);
  address normal_user = address(0x478);
  address abusive_user = address(0x789);

  /// @notice Setup function to deploy the Faucet contract before each test
  function setUp() external {
    vm.startPrank(admin);
    faucet = new Faucet(); // Deploy Faucet as the admin user
    vm.deal(address(faucet), 1000 ether); // Give the faucet 1000 ether
    vm.stopPrank();
  }

  /// @notice Test to ensure an user can request ether from the faucet
  function test_onceEther() external {
    uint256 tmpBalance = address(faucet).balance;
    vm.prank(once_user);
    faucet.requestEther(); // Request ether from the faucet
    assertEq(once_user.balance, 0.001 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.001 ether);
  }

  /// @notice Test to ensure an user cannot request ether from the faucet more than once per hour
  function test_twiceEther() external {
    uint256 tmpBalance = address(faucet).balance;
    vm.startPrank(abusive_user);
    faucet.requestEther(); // Request ether from the faucet
    assertEq(abusive_user.balance, 0.001 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.001 ether);

    tmpBalance = address(faucet).balance;
    vm.expectRevert();
    faucet.requestEther();
    assertEq(abusive_user.balance, 0.001 ether);
    assertEq(address(faucet).balance, tmpBalance);
    vm.stopPrank();
  }

  /// @notice Test to ensure an user can request ether from the faucet more than once per hour
  function test_twiceEtherAfterHour() external {
    vm.startPrank(normal_user);
    uint256 tmpBalance = address(faucet).balance;
    faucet.requestEther();
    assertEq(normal_user.balance, 0.001 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.001 ether);
    vm.stopPrank();

    tmpBalance = address(faucet).balance;
    vm.startPrank(normal_user);
    vm.warp(block.timestamp + 1 hours);
    faucet.requestEther();
    assertEq(normal_user.balance, 0.002 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.001 ether);
    vm.stopPrank();
  }

  /// @notice Test to ensure an user cannot request ether from the faucet if the balance is insufficient
  function test_insufficientBalance() external {
    // Set the balance of the faucet to 0.0009 ether
    vm.startPrank(admin);
    vm.deal(address(faucet), 0.0009 ether);
    vm.stopPrank();

    // Request ether from the faucet
    vm.startPrank(address(0x193));
    vm.expectRevert();
    faucet.requestEther();
    vm.stopPrank();
  }
}
