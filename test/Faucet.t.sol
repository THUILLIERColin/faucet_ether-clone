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
  address normal_user = address(0x789);
  address award_user = address(0x101);
  address abusive_user = address(0x112);

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

  /// @notice Test to an user can request ether from the faucet once per hour
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

  /// @notice Test to give an user a reward after requesting ether from the faucet 5 times
  function test_rewardThreshold() external {
    uint256 tmpBalance = address(faucet).balance;

    vm.startPrank(award_user);

    faucet.requestEther(); // Request once
    assertEq(award_user.balance, 0.001 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.001 ether);

    vm.warp(block.timestamp + 1 hours);
    faucet.requestEther(); // Request twice
    assertEq(award_user.balance, 0.002 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.002 ether);

    vm.warp(block.timestamp + 1 hours);
    faucet.requestEther(); // Request thrice
    assertEq(award_user.balance, 0.003 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.003 ether);

    vm.warp(block.timestamp + 1 hours);
    faucet.requestEther(); // Request four times
    assertEq(award_user.balance, 0.004 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.004 ether);

    vm.warp(block.timestamp + 1 hours);
    faucet.requestEther(); // Request five times (reward)
    assertEq(award_user.balance, 0.006 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.006 ether);

    vm.warp(block.timestamp + 1 hours);
    faucet.requestEther(); // Request six times
    assertEq(award_user.balance, 0.007 ether);
    assertEq(address(faucet).balance, tmpBalance - 0.007 ether);

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

  /// @notice Test to refill the balance of the faucet
  function test_refill() external {
    vm.startPrank(admin);
    vm.deal(admin, 10 ether);
    vm.deal(address(faucet), 0 ether);
    payable(address(faucet)).transfer(0.001 ether);
    assertEq(address(faucet).balance, 0.001 ether);
    vm.stopPrank();
  }

  /// @notice Test to ensure an user cannot withdraw the balance of the faucet
  function test_withdraw() external {
    vm.startPrank(normal_user);
    vm.expectRevert();
    faucet.withdraw();
    vm.stopPrank();
  }

  /// @notice Test to admin can withdraw the balance of the faucet
  function test_adminWithdraw() external {
    vm.deal(address(faucet), 100 ether);
    vm.prank(admin);
    faucet.withdraw();
    assertEq(address(faucet).balance, 0 ether);
  }
}
