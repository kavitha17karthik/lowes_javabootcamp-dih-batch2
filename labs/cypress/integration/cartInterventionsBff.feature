@BFF

Feature: MRV SCO | Cart Intervention

Background: Open SCO application - Add Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page

Scenario: Item Sold by the foot intervention
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber | itemType |
        |  175730 | soldByFoot |
Then Verify intervention screen
        | interventionMessage |
        | An associate will need to enter the quantity. |
When User scans associate barcode or login using the credentials
Then Verify enter the feet screen
        | pageHeaderMessage |
        | This item is sold by the foot. |
And Click the number of feet for Item and Enter
        | itemFeet |
        | 5 |
And Validate the item added in the cart
        | bffLineNumber |
        | 1663331457673249417128 |

Scenario: Recalled item intervention
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber | itemType |
        |   945170   | recalled |
Then Verify intervention screen
        | interventionMessage |
        | An associate will help you with your purchase. |
When User scans associate barcode or login using the credentials
Then Verify item confirmation screen
        | itemConfirmationMessage |
        | Item can't be sold. |
And Click on return to cart button
Then Validate if user is navigated back to Item Entry Screen

Scenario:  Item can't be sold intervention
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber | itemType |
        |   89001    |  notSold |
Then Verify intervention screen
        | interventionMessage |
        | An associate will help you with your purchase. |
When User scans associate barcode or login using the credentials
Then Verify item confirmation screen
        | itemConfirmationMessage |
        | Item can't be sold. |
And Click on return to cart button
Then Validate if user is navigated back to Item Entry Screen