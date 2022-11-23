@BFF
@HYBRID
Feature: MRV SCO | Add Item feature

Background: Open SCO application - Add Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page

Scenario: Add Item Entry to the cart
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber | bffLineNumber |
        | 1 | 16594432802349881988 |
Scenario: Invalid Item Entry
Then Click the Invalid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1199 |
And Validate the Invalid item vaidation
Scenario: Add Multiple Item Entry to the cart
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber | bffLineNumber |
        | 1 | 16594432802349881988 |
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click another valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber | bffLineNumber |
        | 2 | 16594439996747266285 |