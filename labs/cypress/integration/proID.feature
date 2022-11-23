Feature: MRV SCO | Pro ID feature
This feature will test the pro QR code functionality

Background: Open SCO application - Validate start scanning page
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is on start scanning page

Scenario: Verify valid Pro ID QR code
Given The user is on Start scanning with Menu page
When The user scans valid pro Id QR code
Then Verify if "Pro applied." toast message and "Pro" text is displayed on screen
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
And Authorization Loader get enabled LCC
And Validate tender complete
Then Validate the Select the Print option page 
And Click on the Print button
And Validate the Thanks for shopping page

Scenario: Verify invalid Pro ID QR code
Given The user is on Start scanning with Menu page
When The user scans invalid pro ID QR code
Then Display the incorrect barcode scan screen with continue button
When User clicks on continue button
When The user scans valid pro Id QR code
Then Verify if "Pro applied." toast message and "Pro" text is displayed on screen
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
And Authorization Loader get enabled LCC
And Validate tender complete
Then Validate the Select the Print option page 
And Click on the Print button
And Validate the Thanks for shopping page

Scenario: Verify expired Pro ID QR code
Given The user is on Start scanning with Menu page
When The user scans expired pro ID QR code
Then Verify if "Expired Pro ID QR code." and "Please generate a new QR code and try again." messages are displayed on screen
And User clicks on got it button
Then Verify if user is on item entry page

Scenario: Verify valid Pro code in expired Pro panel which should add Pro customer
Given The user is on Start scanning with Menu page
When The user scans expired pro ID QR code
Then Verify if "Expired Pro ID QR code." and "Please generate a new QR code and try again." messages are displayed on screen
When The user scans valid pro Id QR code
Then Verify if "Pro applied." toast message and "Pro" text is displayed on screen
Then Verify if user is on item entry page
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
And Authorization Loader get enabled LCC
And Validate tender complete
Then Validate the Select the Print option page 
And Click on the Print button
And Validate the Thanks for shopping page

Scenario: Verify expired Pro code in expired Pro panel which should show invalid scan message
Given The user is on Start scanning with Menu page
When The user scans expired pro ID QR code
Then Verify if "Expired Pro ID QR code." and "Please generate a new QR code and try again." messages are displayed on screen
When The user scans expired pro ID QR code
Then Verify if "Invalid scan. Please try again." message is displayed on screen

Scenario: Verify Pro QR Code scan in store mode
Given The user is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Store Login Credentials
And Validate the StoreMode Page
When The user scans valid pro Id QR code
And Click on exit store mode button in the store mode page
Then Verify if "Pro applied." toast message and "Pro" text is displayed on screen
Then Verify if user is on item entry page
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
And Authorization Loader get enabled LCC
And Validate tender complete
Then Validate the Select the Print option page 
And Click on the Print button
And Validate the Thanks for shopping page