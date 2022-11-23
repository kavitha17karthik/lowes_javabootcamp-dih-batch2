@HYBRID
Feature: Test Omnia SCO |  Merch Card DL Scan Feature

Background: Open SCO application - Cart page
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
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
And Click PayNow Button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page for MERCH card
And Authorization Loader get enabled
Then Enter PIN Number
Then Verify Photo Id scan prompt screen




Scenario: Tender with Merch Card via DL Scan - Valid DL Scan
When The user scans valid DL
Then Validate Select Print Receipt option



Scenario: Tender with Merch Card via DL Scan - Hit on Help Button and associate manually enters valid DL number
When The user clicks on Help Button
Then Validate intervention screen "Help is on the way."
And Clicks Store sign in
And Enter the Login Credentials
Then Validate Merch Card Intervention In store header message
And Associate enters valid DL number
        | dlNumber |
        | 1306620 |
Then Validate Select Print Receipt option





Scenario: Tender with Merch Card via DL Scan - Hit on Help Button and associate does not enter DL number
When The user clicks on Help Button
Then Validate intervention screen "Help is on the way."
And Clicks Store sign in
And Enter the Login Credentials
Then Validate Merch Card Intervention In store header message
And Associate does not enter DL number and clicks enter
Then Validate error message "Enter a valid driver's license #."




Scenario: Tender with Merch Card via DL Scan - scans invalid DL number
When The user scans invalid DL
Then Validate invalid DL scan error message "Invalid scan. Try again or tap Help."



Scenario: Tender with Merch Card via DL Scan - scans mismatch DL number
When The user scans mismatch DL
Then Validate invalid DL scan error message "ID does not match. Please use another form of ID or tap Help."





Scenario: Tender with Merch Card via DL Scan - user clicks Back button
When The user clicks Back button
Then Validate Tender Page



Scenario: Tender with Merch Card via DL Scan - Associate clicks Cancel button on merch card intervention screen
When The user clicks on Help Button
Then Validate intervention screen "Help is on the way."
And Clicks Store sign in
And Enter the Login Credentials
Then Validate Merch Card Intervention In store header message
When The Associate clicks Cancel button
Then Validate Tender Page




Scenario: Tender with Merch Card via DL Scan - Hit on Help Button and associate enters invalid DL number
When The user clicks on Help Button
Then Validate intervention screen "Help is on the way."
And Clicks Store sign in
And Enter the Login Credentials
Then Validate Merch Card Intervention In store header message
And Associate enters invalid DL number
        | dlNumber |
        | 564321 |
Then Validate merch card error "Enter a valid driver's license # and state."




Scenario: Tender with Merch Card via DL Scan - user lands on intervention screen if more than two invalid/mismatch DL Scan
When The user scans mismatch DL
When The user scans invalid DL
When The user scans mismatch DL
Then Validate intervention screen "Help is on the way."







