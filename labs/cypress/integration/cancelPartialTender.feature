@HYBRID
Feature: MRV SCO | Cancel partial tender

Background: Open SCO application - Tender Cash Flow
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
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

Scenario: Cancel Payment - Cash flow and complete tender
When User inserts the money in the Cash recycler "0.10"
Then Validate the Amount paid and change due screen
When User clicks on the Cancel Payment button on tender page
Then Verify intervention screen
When User scans associate QR code or login using the credentials
Then Validate Cancel Payment screen is displayed with refund cash amount
And Click on Cancel Payment button
Then Validate the tender page and tender declined message
Then Enter cash amount "20"
And Validate amount entered in tender page
Then Validate the receipt option
And Select print receipt option
And Validate thank you message

Scenario: Cancel Payment - Cancel on Intervention page
When User inserts the money in the Cash recycler "0.10"
When User clicks on the Cancel Payment button on tender page
Then Verify intervention screen
When User clicks on the Cancel button
Then Validate the Amount paid and change due screen

Scenario: Cancel Payment - Cancel on confirmation page
When User inserts the money in the Cash recycler "0.10"
When User clicks on the Cancel Payment button on tender page
Then Verify intervention screen
When User scans associate QR code or login using the credentials
Then Validate Cancel Payment screen is displayed with refund cash amount
When User clicks on the Cancel button
Then Validate the Amount paid and change due screen

Scenario: Cancel Payment - Go back to cart page and validate
When User inserts the money in the Cash recycler "0.10"
Then Validate the Amount paid and change due screen
When User clicks on the Cancel Payment button on tender page
Then Verify intervention screen
When User scans associate QR code or login using the credentials
Then Validate Cancel Payment screen is displayed with refund cash amount
And Click on Cancel Payment button
Then Validate the tender page and tender declined message
When User clicks on the back button
And Verify user is on cart page with Pay Now button enabled and click
And Validate the Bag page
Then Click on enter on the bag page
And Validate the Tender Page
