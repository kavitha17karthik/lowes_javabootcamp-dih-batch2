@HYBRID
Feature: MRV SCO | ItemSearch Flow

Background: Open SCO application -  ItemSearch Flow
Given The user is on MRV sco page 
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page

Scenario: Add Item to the cart and from the item Lookup
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
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
And The user clicks on the Item Lookup menu
And Validate the Item Search Page
Then Click the Valid Item name in touchpad keyboard
        | keyword |
        | nut |
Then Select any one category from the category list
Then Click on any item from item search list
And Validate the item added in the cart
        | lineNumber |
        | 1 |

Scenario: Item not found on item Lookup
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
And The user clicks on the Item Lookup menu
And Validate the Item Search Page
Then Click the Valid Item name in touchpad keyboard
        | keyword |
        | cat |
Then Validate item not found result on item lookup