@HYBRID
Feature: MRV SCO | Cash Tender Exceptional Tests

Background: Open SCO application - Validate start scanning page
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page

Scenario: Cancel on Banner message resets available tenders and complete cash flow
And Start screen is seen in "Cards Only" mode
And Banner message is seen with "The cash recycler is currently offline." message
When User connects the Cash recycler and click on cancel button on Banner message
Then Start screen is seen in "Cash and Cards" mode
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber |
        | 1 |
Then Click on the Pay Now button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page
When User inserts the money in the Cash recycler "20"
Then Validate the Amount paid and change due screen
When User pulls out the remaining change from the Cash recycler
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page
