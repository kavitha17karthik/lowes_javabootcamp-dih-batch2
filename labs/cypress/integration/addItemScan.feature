
@HYBRID
Feature: MRV SCO | Add Item Scan feature

Background: Open SCO application - Add Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Scenario:Scan Coupon and Blackhawk
Then Verify if user is navigated to start scanning page
When User Scans the Item Number
        | itemNumber |
        | ^076750043900009877890000004567[114q |
        | itemNumber |
        | ^470000000063826[114q |
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber |
        | 1  |
And When user clicks on line number item & Back button
        | lineNumber |
        | 1 |
And Login into store mode by Clicking StoreMode button
When Store Login Credentials
And Validate the StoreMode Page


