@BFF
Feature: MRV SCO | BFF Flow of CancelPartialTender GiftCard

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
Then Click on the Pay Now button
And Validate the Tender Page 
And Authorization Loader get enabled for GC

Scenario: Cancel Payment API Failure 
And Validate tender activate for partial tender
And Validate gift card authorization for cancel partial tender
When Authorization Loader get enabled for GC zero
And Validate tender page for GC failure
When User clicks on the Cancel Payment button on tender page
Then Verify intervention screen
When User scans associate QR code or login using the credentials
And Cancel Payment Fails
When Click on Cancel Payment button
Then Validate Page with Payment Cancellation Failed

Scenario: Partial Tender Activation Fails
And TenderPage validation for PartialTender activate Failure
When Activation Fails
Then Unknown Error Message page gets displayed

Scenario: Partial Tender Deactivate Fails
And Validate tender activate for partial tender
When Authorization Loader get enabled for VISA
And Provide the signature from PinPad
When Deactivate call Fails





