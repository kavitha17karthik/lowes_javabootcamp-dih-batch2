@HYBRID
Feature: MRV SCO | Print Timeout for rebate flow

Background: Open SCO application - Rebate flow
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
        | 1049870 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber |
        | 1 |
Then Click on the Pay Now button
Then Validate the Warranty page 'Are you interested in protecting this item?'
And Select any one LPP option
And Validate the Tender Page
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on the Print button
Then Validate "How do you want to submit your rebates?"