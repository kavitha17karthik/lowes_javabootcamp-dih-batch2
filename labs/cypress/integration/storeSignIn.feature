@HYBRID
Feature: MRV SCO | Sign In feature
Validate if associate is able to sign in to the MRV sco application

Background: Open SCO application and navigate to store sign in page
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page

Scenario: Associate SignIn via Valid Username and Password
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page

Scenario: Associate SignIn via Invalid QR Code
When The user scans invalid QR Code
Then Verify the invalid QR code error message