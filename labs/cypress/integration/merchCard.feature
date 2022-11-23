@HYBRID
Feature: MRV SCO | Merch card feature

Background: Open SCO application - Add Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page

Scenario: Complete Sale using MERCH CARD with DL Info(DL 1306620)
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
And Click PayNow Button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page for MERCH card
And Authorization Loader get enabled
Then Enter PIN Number
Then The user will be redirected to Help is on the way page
When User scans associate barcode or login using the credentials
Then Verify MerchCard intervention screen
And Enter Customer DL Number
And Validate tender complete
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page




