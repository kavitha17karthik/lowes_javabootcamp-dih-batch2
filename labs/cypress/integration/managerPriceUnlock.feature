@HYBRID
Feature: MRV SCO | Manager Price Unlock - Price Restricted Item Edit feature
Background: Open SCO application - Edit Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When User Scans the Item Number
        | itemScanNumber |
        | ^12242[114q |
And Validate the item added in the cart
        | lineNumber |  |
        | 1 |  |
And Click on the Store Mode Button
Then Verify if user is navigated to the store sign in page
When Enter the Store Login Credentials
And Validate the StoreMode Page

Scenario: Click Cancel button on Manager approval Page
And Clicks on line number item & Validate UpdateItem page
        | lineNumber |  |
        | 1 |  |
Then Enters Discount value & Click Enter
        | discountValue |
        | 99 |
Then Select a Reasoncode for Price change
When Manager Approval Screen is displayed
Then Click on Cancel button

Scenario: Invalid Manager Passcode for Price Unlock    
And Clicks on line number item & Validate UpdateItem page
        | lineNumber |
        | 1 |
Then Enters Discount value & Click Enter
        | discountValue |
        | 99 |
Then Select a Reasoncode for Price change
When Manager Approval Screen is displayed
Then Scan Manager passcode to Approve the Price change
        | managerPasscode |
        | ^2900019021029[114q |
        
Scenario: Valid Manager Passcode for Price Unlock    
And Clicks on line number item & Validate UpdateItem page
        | lineNumber |
        | 1  |
Then Enters Discount value & Click Enter
        | discountValue |
        | 99 |
Then Select a Reasoncode for Price change
When Manager Approval Screen is displayed
Then Scan Manager passcode to Approve the Price change
        | managerPasscode |
        | ^2900018021029[114q |
Then Check Updated Price in the CartPage

Scenario: Keep the item in the cart
And Clicks on line number item & Validate UpdateItem page
        | lineNumber  |
        | 1  |
When Click Remove icon on the right top of Update Item Page
Then Removed Item Intervention Screen appears
        | confirmationMessage  |
        | Removed item. |
Then Click keep Item
Scenario: Remove the item from the cart
And Clicks on line number item & Validate UpdateItem page
        | lineNumber |
        | 1  |
When Click Remove icon on the right top of Update Item Page
Then Removed Item Intervention Screen appears
        | confirmationMessage  |
        | Removed item. |        
Then Click Remove Item from sale


Scenario: Price-required Item and Complete a sale
Then Scan a Price-required Item
        | itemScanNumber |      
        | ^11210[114q |
Then Price-required Item Intervention Screen appears
        | confirmationMessage  |
        | Price-required item. |
When Click on Cancel button on Price-required item Screen
Then Validate the store Mode button in the cart page
Then Scan a Price-required Item
        | itemScanNumber |      
        | ^11210[114q |
Then Price-required Item Intervention Screen appears
        | confirmationMessage  |
        | Price-required item. |
When Click Enter Price
And Enter Price for an Item & click Enters
        | sellingPrice |
        | 1800 |
Then Select a Reasoncode for Price change
When Manager Approval Screen is displayed
Then Scan Manager passcode to Approve the Price change
        | managerPasscode |
        | ^2900018021029[114q |
Then Click on the Pay Now button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page
        | totalPrice |
        | 1926 |
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page