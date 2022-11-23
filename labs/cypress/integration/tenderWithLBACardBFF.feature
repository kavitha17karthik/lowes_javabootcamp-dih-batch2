@BFF

Feature: MRV SCO | LBA Card

Background: Open SCO application - Tender Card Flow
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page

Scenario: LBA Card flow - Success
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | bffLineNumber |
        | 16594432802349881988 |
Then Click on the Pay Now button
And Validate the Tender Page
And Authorization Loader get enabled LBA
When The user enters correct last four digits of card
And Validate Processing screen
And Validate tender complete
Then Validate the Select the Print option page
And Click on the Print button

Scenario: LBA Card flow - Failure
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | bffLineNumber |
        | 16594432802349881988 |
Then Click on the Pay Now button
And Validate the Tender Page
And Authorization Loader get enabled failed to approve
And Intervention page loaded with Unknown Error Message