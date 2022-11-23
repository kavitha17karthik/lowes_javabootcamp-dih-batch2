Feature: MRV SCO | Login failure sigcap error

Given The associate is on close lane

Scenario: Associate is in card only register
When Associate sign in into card only register and login fails with sigcap error
Then Validate the sigcap error message on the screen

Scenario: Associate is in card and cash register
When Associate sign in into card and cash register and login fails with sigcap error
Then Validate the sigcap error and cash recycler error message on the screen
