@BFF

Feature: Test Omnia SCO |  Age Restricted Interventions 

Background: Open SCO application - FeedBack Flow
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry page



Scenario: Age Intervention on first item for 18 years
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |   itemType    |
        |    1026685    |    ageRestricted  |
Then Verify intervention screen
        | interventionMessage |
        | Associate approval is needed for an age-restricted item. |
When User scans associate barcode or login using the credentials
Then Verify item confirmation screen
        |  itemConfirmationMessage  |
        | Age-restricted item. |
And Click on Approve button
        |  itemType    |
        |   ageRestricted   |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
Then Validate if item is added to cart
        | itemNumber |
        | Item #1026685 |
