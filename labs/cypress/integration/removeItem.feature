@BFF
@HYBRID
Feature: MRV SCO | Remove Item feature

Background: Open SCO application - Remove Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Connecting to the Hardware page will be loaded
Then Verify if user is navigated to start scanning page

Scenario: Add Item Entry to the cart and Remove the Item
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | How many do you have? |
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 16594432802349881988 |
And Click on the Item to edit the Quantity
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | Update the item below. |
And Click the Remove button
Then The user will be redirected to Help is on the way page
And Required Store SignIn to remove the Item, So Click on the Store SignIn button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if the user navigated to Removed Item Page
And Click on the Remove from Sale Button
Then Verify if user is navigated to start scanning page


Scenario: Add Multiple Item Entry to the cart and Remove the Item in the cart
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | How many do you have? |
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 16594432802349881988 |
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click another valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | How many do you have? |
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber |bfflineNumber|
        | 2 | 16594432802349881988 |
And Click on the First Item to edit the Quantity 
         | lineNumber |bfflineNumber|
        | 2 | 16594432802349881988 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | Update the item below. |
And Click the Remove button
Then The user will be redirected to Help is on the way page
And Required Store SignIn to remove the Item, So Click on the Store SignIn button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if the user navigated to Removed Item Page
And Click on the Remove from Sale Button
And Validate the item added in the cart
      | lineNumber |bfflineNumber|
      | 2 | 1666085605983088358661 |
