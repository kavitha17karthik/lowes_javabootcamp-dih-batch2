@BFF
Feature: MRV SCO | API Failure Scenario

Background: Open SCO application  Cancel Partial Tender with GC 
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Valid Item number in touchpad keyboard and Enter
        | itemNumber |
        | 12212 |
And Validate the add quantity page with user Message "How many do you have?"
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | bffLineNumber |
        | 16594432802349881988 |

Scenario: Approve Failure
Then Click on the Pay Now button
And Validate the Tender Page
When User Swipe VISA Card
And Approve Failure happens with Unknown Error Message

Scenario: Activate Failure
Then Activation Failure
When User Swipe Visa Card Activation Fails
And Activate Failure happens with Unknown Error Message

Scenario: Deactivate Failure
Then Click on the Pay Now button
And Validate the Tender Page
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
When VISA CARD payment Fails
Then Clicking backbutton deactivate and shows cart Page
