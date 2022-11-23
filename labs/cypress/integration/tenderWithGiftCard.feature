@ignore
Feature: Test Omnia SCO | Tender feature

Background: Open SCO application - Tender Card Flow
Given The user is on omnia sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page

Scenario: Gift Card - Tender flow
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
And Validate the Tender Page GC
And Authorization Loader get enabled GC
And Validate gift card authorization
And Validate tender complete
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page

Scenario: Gift Card - Cancel Partial tender 
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
And Validate the Tender Page GC
And Authorization Loader get enabled GC
And Validate gift card authorization for cancel partial tender
Then Validate tender activate for partial tender
When User clicks on the Cancel Payment button on tender page
Then Verify intervention screen
When User scans associate QR code or login using the credentials
Then Validate Cancel Payment screen is displayed with refund cash amount
And Click on Cancel Payment button
Then Validate the tender page and tender declined message
