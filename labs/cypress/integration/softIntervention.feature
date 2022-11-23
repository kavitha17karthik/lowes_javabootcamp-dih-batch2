@BFF
Feature: MRV SCO | Soft intervention feature

Background: Open SCO application - Add Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page

Scenario: Adding measurement items to the cart
When Enter "12212" item number though manual entry
Then Enter a measurement item "175730"
And Enter another measurement item "895538"
Then Validate the items added to the cart
| lineNumber | bffLineNumber |
| 1 | 1665988959439471384927 |
| 2 | 1665988959439471384928 |
| 3 | 1665988959439471384929 |
And Select the first item "1665988959439471384927" to delete from the cart
And Validate remove item confirmation page "12212"
And Select No keep item option
And Select the first item "1665988959439471384927" again to delete from the cart
And Select remove item option
And Validate item removed from the cart and total price got updated
Then Click the pay now button to proceed to payment screen
And Validate the intervention screen with following restricted items
| itemNumber | warningMsg |
| 12212 | Removed item |
| 175730 | Measurement required item |
| 895538 | Measurement required item |

Then Associate scan QR code to logs in
And Validate removed item approval and approves it and moves to next screen
And Validate first measurement required item and entered the no of qty
And Validate second measurement require item and enter the no of qty and moves to payment screen
