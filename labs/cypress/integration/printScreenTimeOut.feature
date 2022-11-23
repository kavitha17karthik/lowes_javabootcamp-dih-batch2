@HYBRID
Feature: MRV SCO | Print Timeout flow

Background: Open SCO application - Print Timeout flow
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page





Scenario: Select Print from Receipt Option
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 22548 |
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
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on the Print button
Then Validate Print API call
Then Validate "Don't forget your receipt."





Scenario: Don't select any option on Print Screen
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 22548 |
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
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Skip Receipt option
Then Validate the User is on Start scanning screen




Scenario: Select Email & Print receipt option
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 22548 |
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
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on Email & Print button
Then Validate if the existing email id is correct "Is this correct?"
Then Validate Please enter your email
Then Enter the Valid Email Id "y@hotmail.com" and Tap Apply
Then Validate "Is this correct?" and tap yes
Then Validate "Printing and emailing receipt."
