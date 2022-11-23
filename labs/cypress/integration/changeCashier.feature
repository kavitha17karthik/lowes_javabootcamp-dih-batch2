@HYBRID
Feature: MRV SCO | Cashier Change Flow

Background: Open SCO application -  Cashier Change Flow
Given The user is on MRV sco page 
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page

Scenario: Verify the current cashier name is not override with store mode login
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Store Login Credentials
And Validate the StoreMode Page
And The user clicks on the Cashier Tools menu
And Validate the Cashier Tools Page
And Validate the current cashier name is not change "T U. (Current)"
And Click on exit store mode button in the store mode page
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
And Validate the item added in the cart
        | lineNumber |
        | 1 |
Then Click on the Pay Now button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on the Print button
And Validate the AddAssociateToWorkFile API call "S6415TU1"
And Validate the Thanks for shopping page

Scenario: Verify the AddAssociateToWorkFile call with QR code login
When The user scans valid QR Code
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Store Login Credentials
And Validate the StoreMode Page
And The user clicks on the Cashier Tools menu
And Validate the Cashier Tools Page
And Validate the current cashier name is not change "T U. (Current)"
And Click on exit store mode button in the store mode page
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
And Validate the item added in the cart
        | lineNumber |
        | 1 |
Then Click on the Pay Now button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on the Print button
And Validate the AddAssociateToWorkFile API call "S6415TU1"
And Validate the Thanks for shopping page

Scenario: Scan the Valid QR code to change the cashier name
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Store Login Credentials
And Validate the StoreMode Page
And The user clicks on the Cashier Tools menu
And Validate the Cashier Tools Page
And Validate the current cashier name is not change "T U. (Current)"
Then The user Click the Change Cashier Menu
And Validate the Change Cashier Page
Then scan the QR code to change the cashier name
        | qrCode |
        | ^_QR_jyCIHPdSGi2ByXXnOCL/mc7ThMDRAQuQMnaXTvgMIHg=[114q |
Then Validate the Store Mode Page with updated Toast message
And Click on exit store mode button in the store mode page
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
And Validate the item added in the cart
        | lineNumber |
        | 1 |
Then Click on the Pay Now button
And Validate the Bag page
Then Enter the Bag quantity using touchpad and Click Enter
        | BagQuantity |
        | 1 |
And Validate the Tender Page
Then Insert the card in the PED device and enter the Pin number
And Authorization Loader get enabled
And Provide the signature from PinPad
Then Validate the Select the Print option page
And Click on the Print button
And Validate the AddAssociateToWorkFile API call "S6415TT1"
And Validate the Thanks for shopping page

Scenario: Verify the intervention login should not override the current cashier
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Hard stop Item number in touchpad keyboard and Enter
        | itemNumber |
        | 89004 |
Then The user will be redirected to Help is on the way page
And Required Store SignIn to verify the Hard Stop Item, So Click on the Store SignIn button
Then Verify if user is navigated to the store sign in page
When Enter the Intervention Login Credentials
And Verify if the user navigated to the Item cannot be sold Page
And Click Return To Cart button displayed on the screen
Then Click the Back button from the Item Entry page
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
And The user clicks on the Cashier Tools menu
And Validate the Cashier Tools Page
And Validate the current cashier name is not change "T U. (Current)"

Scenario: Verify the current cashier name should be current lane open logged in user
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
And The user clicks on the Cashier Tools menu
And Validate the Cashier Tools Page
And Validate the current cashier name is not change "T U. (Current)"
And Click on the close lane button in store mode
And Validate the close lane confirmation page
And Click on yes button
And Validate the Close Lane Page
When User clicks on store sign in button
When Enter the Store Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
And The user clicks on the Cashier Tools menu
And Validate the Cashier Tools Page
And Validate the current cashier name is not change "T T. (Current)"

Scenario: Invalid QR code entry in change cashier
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page
When The User is on Start scanning with Menu page
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
And The user clicks on the Cashier Tools menu
And Validate the Cashier Tools Page
Then The user Click the Change Cashier Menu
And Validate the Change Cashier Page
Then scan the QR code which is invalid
        | qrCode |
        | ^_QR_qQ42d7NQxqDoQLFqozUzT4/fqxMS3YiP1bjmAfQ=[114q |
Then Validate the QR code which is invalid
