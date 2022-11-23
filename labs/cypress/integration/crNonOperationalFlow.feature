@HYBRID
Feature: MRV SCO | CR Non Operational feature

Background: Open SCO application and navigate to the cart page
Given The user is on omnia sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
        
Scenario: Suspend Sale flow
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
Then Validate if user is able to see "We’re unable to process cash payments at this time. Use a card instead?"
And Click on No button
Then Verify intervention screen
When User scans associate QR code or login using the credentials
Then Validate the payment device error page
Then Verify and click Suspend sale button displayed on the screen
Then Validate the start scanning page

Scenario: View Cart flow - Exit Store Mode
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
Then Validate if user is able to see "We’re unable to process cash payments at this time. Use a card instead?"
And Click on No button
Then Verify intervention screen
When User scans associate QR code or login using the credentials
Then Validate the payment device error page
And Verify and click on the View Cart button displayed on the screen
Then Validate the StoreMode Page
And Click on exit store mode button in the store mode page
Then Validate the store Mode button in the cart page

Scenario: View Cart flow - Clear Cart
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
Then Validate if user is able to see "We’re unable to process cash payments at this time. Use a card instead?"
And Click on No button
Then Verify intervention screen
When User scans associate QR code or login using the credentials
Then Validate the payment device error page
And Verify and click on the View Cart button displayed on the screen
Then Validate the StoreMode Page
And Click on the clear cart button in store mode
And Validate the clear cart confirmation page
And Click on yes button
Then Validate the start scanning page
Then Validate the pheripheral banner error message