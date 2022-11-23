Feature: Test Omnia SCO |  Customer Lookup Feature

Background: Open SCO application - Cart page
Given The user is on omnia sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page

Scenario: Military Lookup - Add valid customer and complete sale
Given The user clicks on the Item Entry menu
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
Given The user clicks on the Military Discount menu
And Validate the Military Discount Page
Then Search for military lookup number in touchpad keyboard
        | militaryNumber |  customerType  |
        | 6188021369 |      inValid       |
And Validate no results found
Given The user clears the value from field
Then Search for military lookup number in touchpad keyboard
        | militaryNumber |  customerType  |
        | 9876509876 |     valid     |
And Validate verfied customer
Then Select the customer radio button
And Click on Apply button
Then Verify intervention screen
When User scans associate barcode or login using the credentials
Then Validate the customer information page
And Click on yes button
Then Verify military applied successfully
Then Click on the Pay Now button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page
When User inserts the money in the Cash recycler "20"
Then Validate the Amount paid and change due screen
When User pulls out the remaining change from the Cash recycler
Then Validate the Select the Print option page
And Click on the Print button
And Validate the thanks for Military shopping page 

Scenario: Military Lookup - Do not add customer in cart
Given The user clicks on the Item Entry menu
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
Given The user clicks on the Military Discount menu
And Validate the Military Discount Page
Then Search for military lookup number in touchpad keyboard
        | militaryNumber |  customerType  |
        | 9876509876 |     valid     |
And Validate verfied customer
Then Select the customer radio button
And Click on Apply button
Then Verify intervention screen
When User scans associate barcode or login using the credentials
Then Validate the customer information page
And Click on no button
Then Validate Pay Now button