
Feature: MRV SCO | wireless scanner feature

Background: Open SCO application - wireless scanner flows
Given The user is on MRV sco page
When User clicks on store sign in button
Then Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
Then Enter the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
Then Click on the Pay Now button
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |

Scenario: Wireless scanner not placed on the cradle
Then Validate the customer information on wireless scanner
And Click on the Continue button

Scenario: Cancel button click on wireless scanner not placed screen
Then Click cancel button on scanner not placed screen
Then validate cancel button click on scanner not placed screen

Scenario: Continue without placing the sacnner on cradle
Then Validate the customer information on wireless scanner
And Click continue button with error
Then validate cancel button click on scanner not placed screen





