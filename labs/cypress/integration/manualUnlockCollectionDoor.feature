@ignore
Feature: MRV SCO | Manual Unlock Collection Door feature

Background: Open SCO application - Manual Unlock Collection Door Flow
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page


Scenario: Manual Unlock Collection Door on Start Scanning Page
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
Then Verify if user is return to start scanning page


Scenario: Manual Unlock Collection Door on Start Page
When The User is on Start scanning with Menu page
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
Then verify the user is return to start page

Scenario: Manual Unlock Collection Door on Item Entry Page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
And Validate the Item Entry Page

Scenario: Manual Unlock Collection Door on Add Quantity Page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message "How many do you have?"
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
Then Validate the add quantity page with user Message "How many do you have?"

Scenario: Manual Unlock Collection Door on Item Added In the Cart
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
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
And Validate the item added in the cart
        | lineNumber |
        | 1 |

Scenario: Manual Unlock Collection Door on Bag Page
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
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
And Validate the Bag page

Scenario: Manual Unlock Collection Door on Tender Page
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
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
And Validate the Tender Page

Scenario: Manual Unlock Collection Door on Insert the card in the PED device Screen and procced to complete the transaction
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
Then Insert the card in the PED device and enter the Pin number
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page


Scenario: Manual Unlock Collection Door on Start Scanning Page with Invalid Cassette
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted With Error
Then Validate the Collection door Intervention page
And Click on Unlock Collection Door button without store mode
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
Then Verify if user is return to start scanning page

Scenario: Manual Unlock Collection Door on Store Mode with Invalid Cassette Issue
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted With Error
Then Validate the Collection door Intervention page
And Click on Unlock Collection Door button with store mode
Then Manually unlock the stash - Stash Unlocked
And Remove the stash - Stash Removed
Then Lock the collection door - Stash locked
And Insert the stash - Stash Inserted
Then Validate the StoreMode Page
