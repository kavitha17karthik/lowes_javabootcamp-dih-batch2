@BFF
@HYBRID
Feature: MRV SCO | Edit Item feature

Background: Open SCO application - Edit Item to the Cart
Given The user is on MRV sco page
When User clicks on store sign in button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
Then Verify if user is navigated to start scanning page

Scenario: Edit Item with Increase Quantity
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | How many do you have? |
And Click the quantity for the Item and Enter
        | itemQty |
        | 1 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 166331627129190591383 |
And Click on the Item to edit the Quantity
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | Update the item below. |
And Click the quantity for the Item and Enter
        | itemQty |
        | 2 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 166331627129190591383 |

Scenario: Approve New Quantity while Edit Item with Reduce Quantity
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | How many do you have? |
And Click the quantity for the Item and Enter with multiple quantity
        | itemQty |
        | 5 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 166331627129190591383 |
And Click on the Item to edit the Quantity
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | Update the item below. |
And Click the quantity for the Item and reduce the quantity
        | itemQty |
        | 4 |
Then The user will be redirected to Help is on the way page
And Required Store SignIn to remove the Item, So Click on the Store SignIn button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
And Verify if the user navigated to Reduce Item Quantity Page
And Click on the Approve New Quantity Button
And Validate the item quantity added in the cart
        | lineNumber | bfflineNumber | itemQuantity |
        | 1 | 166331627129190591383 | 4 |

Scenario: Keep Current Item Quantity while edit Item with Reduce Quantity 
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | How many do you have? |
And Click the quantity for the Item and Enter with multiple quantity
        | itemQty |
        | 5 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 166331627129190591383 |
And Click on the Item to edit the Quantity
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | Update the item below. |
And Click the quantity for the Item and reduce the quantity
        | itemQty |
        | 4 |
Then The user will be redirected to Help is on the way page
And Required Store SignIn to remove the Item, So Click on the Store SignIn button
Then Verify if user is navigated to the store sign in page
When Enter the Login Credentials
And Verify if the user navigated to Reduce Item Quantity Page
And Click on the Keep Current Item Quantity Button
And Validate the item quantity added in the cart
        | lineNumber | bfflineNumber | itemQuantity |
        | 1 | 166331627129190591383 | 5 |

Scenario: Edit Item with Reduce Quantity on Store Mode
When The User is on Start scanning with Menu page
And The user clicks on the Item Entry menu
And Validate the Item Entry Page
Then Click the Item number in touchpad keyboard and Enter
        | itemNumber |
        | 1121 |
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | How many do you have? |
And Click the quantity for the Item and Enter with multiple quantity
        | itemQty |
        | 5 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 166331627129190591383 |
And Click on the Store Mode Button in Bottom Left
When Enter the Login Credentials
And Validate the StoreMode Page
And Click on the Item to edit the Quantity
And Validate the add quantity page with user Message
        | itemQtyUserMessage |
        | Update this item.|       
And Click the quantity for the Item and reduce the quantity
        | itemQty |
        | 4 |
And Validate the item added in the cart
        | lineNumber | bfflineNumber |
        | 1 | 166331627129190591383 |
And Click on the Exit Store Mode Button in Bottom Left
