@BFF

Feature: MRV SCO | Store Mode Activities BFF

Background: Open SCO application -  Add item to cart
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
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | bffLineNumber |
        | 16594432802349881988 |
When The user clicks on the Store Mode Button in Bottom Left
And Enter the Login Credentials and validate the StoreMode page

Scenario: Store mode - Clear cart
When The user clicks on the clear cart menu
Then Validate "Are you sure you want to clear the cart?" confirmation page
When User clicks on no button
Then Validate store mode page
When The user clicks on the clear cart menu
When User clicks on yes button
Then Verify start scanning page is visible

Scenario: Store mode - Print Last Receipt
When The user clicks on the print last receipt menu
Then Validate "Print the receipt for the last transaction?" confirmation page
When User clicks on no button
When The user clicks on the print last receipt menu
When User clicks on yes button
Then Validate store mode page

Scenario: Store mode - Print Associate QR Code
When The user clicks on the print associate QR code menu
Then Validate "Print your QR code?" confirmation page
When User clicks on no button
Then Validate store mode page
When The user clicks on the print associate QR code menu
When User clicks on yes button
Then Validate store mode page

Scenario: Store mode - Close Lane
When The user clicks on the close lane menu
Then Validate "Are you sure you want to close the lane?" confirmation page
When User clicks on no button
Then Validate store mode page
When The user clicks on the close lane menu
When User clicks on yes button
Then Validate closed for now screen

Scenario: Store mode - Log Off Report
When The user clicks on the log off menu
Then Validate "Print the logoff report?" confirmation page
When User clicks on no button
Then Validate store mode page
When The user clicks on the log off menu
When User clicks on yes button
Then Validate closed for now screen