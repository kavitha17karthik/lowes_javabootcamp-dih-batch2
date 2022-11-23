Feature: Test Omnia SCO |  Cart Interventions 

Background: Open SCO application - Cart page
Given The user is on omnia sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
Given The user clicks on the Item Entry menu
And Validate the Item Entry Page

Scenario: High value item intervention
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |    itemType   |
        |      5     |    highValue  |  
Then Verify intervention screen
        | interventionMessage |
        | Associate approval is needed for a high-value item. |
When User scans associate barcode or login using the credentials
Then Verify item confirmation screen
        |  itemConfirmationMessage  |
        | High-value item. |
And Click on Approve button
        |  itemType    |
        |   highValue   |
Then Validate if item is added to cart
        | itemNumber |
        | Item #5 |

Scenario: Age restricted item intervention
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |   itemType    |
        |    10452    |    ageRestricted  |
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
Then Validate if item is added to cart
        | itemNumber |
        | Item #10452 |

Scenario: Recalled item intervention
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |   itemType    |
        |   945170    |    recalled  |
Then Verify intervention screen
        | interventionMessage |
        | This item cannot be sold due to recall. |
When User scans associate barcode or login using the credentials
Then Verify item confirmation screen
        |  itemConfirmationMessage  |
        |   Recalled item. |
And Click on return to cart button
Then Validate if user is navigated back to cart screen