@HYBRID
Feature: MRV SCO | CR Cash shortage feature
  As customer i should be able to perform a transaction with cash, and should be route though correct scenarios on cash shortage

Background: Open SCO application and load landing page
Given We are on omnia sco page
When Associate clicks on the sign button to login
Then Verify if associate is navigated to the store sign in page
When Associate enters the Login Credentials successfully 
Then Verify hardware check processing
And The customer is on Start scanning page

Scenario: Perform a cash transaction with shortage
Then The customer scanned first item 
    | itemNumber |
    | 1121 |
And Validate the add quantity page with user Message "How many do you have?"
And Enter item quantity and proceed
    | itemQty |
    | 2 |
And Validate item being added to the cart
    | lineNumber |
    | 1 |
Then Click on the Pay Now button
And Validate the Bag page
Then Enter the Bag quantity using touch pad and Click Enter and proceed
    | BagQuantity |
    | 1 |
And Validate cash tender page
Then Enter cash amount "20"
And Validate amount entered in tender page
Then Validate the receipt option
And Select print receipt option 
And Validate thank you message
Then Customer is on start scanning again
And Login into store mode
And Validate cash shortage warning "10 dollar bills are running low. Replenishment is required soon."
Then Close the first banner
And Validate cash overflow warning "20 dollar bills are full. Cash collection required."
Then Exist from store mode