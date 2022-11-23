Feature: Test Omnia SCO | Split Tender feature

Background: Open SCO application - Split Tender Flow

Scenario: Gift Card and Visa Card - Tender flow
Given The user is on omnia sco page
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
And Validate the Tender Page GC
And Authorization Loader get enabled GC
And Validate gift card authorization for tender start
Then Validate tender activate for split tender "50"
And Validate the Tender Page
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
And Provide the signature from PinPad and enter the remaining amount "61"
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page

Scenario: Cash and Gift Card - Tender flow
Given The user is on omnia sco page for Split tender
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
And Validate the Cash Tender Page
When User inserts the money in the Cash recycler for authorized "0.10"
Then Validate the Amount paid and remaining amount due screen
And Validate the Tender Page for Cash and Card
And Authorization Loader get enabled GC
And Validate gift card authorization for tender complete
And Validate tender complete
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page

Scenario: Gift Card and then Cash - Tender flow
Given The user is on omnia sco page for Split tender
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
And Validate the Tender Page for Cash and Card
And Authorization Loader get enabled GC
And Validate gift card authorization for tender start
Then Validate tender activate for split tender "50"
And Validate the card and cash tender
When User inserts the money in the Cash recycler "0.61"
And Validate tender complete
Then Validate the Select the Print option page
And Click on the Print button
And Validate the Thanks for shopping page