# iot-ecom

* As a user..  I want to login to app securely 
  
* As a seller..  I want to list of products 
* As a seller.. I want to make the draft of products
    -have edit button for the product list
* As a seller.. I want to  modify the list of products 
* As a seller.. I want to see the list of purchase orders from shopper
* As a seller.. I want to  update the status of the orders
* As a seller.. I want to see how many product are still available 
* As a seller.. I want to see how much money I am making 
* As a seller.. I want to track product quantity 

* As a shopper..  I want to view a list of products 
* As a shopper…  I want to add and review my cart 
* As a shopper… I want to check out securly 
* As a shopper…  I want to review my orders 
* As a shopper…  I want to talk with the customer services
* As a shopper… I want to search the items
* As a shopper… I want to save or make a wish lists of the product 
* As a shopper… I want have a option for one click checkout 

User Story

* As a user.. I want to login to app securely 
    Frontend - completed
        - Make login page
        - add form with email and password
        - have submit button
    Backend - completed
        - compare the validation
         - if success send user data
         - show error

* As a user..  I want to logout - complete
    Frontend -> 2hrs
        - have button to logout
        - remove all cookies when click logout button 
        - once success navigate to home page

* As a user.. I want to signup  
    Frontend -> 2hrs
        - Make signup page route 
        - add form with email, password, name, street, city, state, zip
        - have signup button
    Backend -> 3hrs
        - create post request for signup
        - check when submited request
        - check if input is valid or not
        - show error

* As a user.. I want to create of product
    Frontend -> 3hr
        - Make products route
        - add form with name, description, price, quantity
        - have submit button
        - show error if any
        - if success navigate to products page
    Backend -> completed
        - create db
        - create post request for product
        - show error if any
        
* As a user.. I want to edit of product 
    Frontend -> 3hrs
        - form with name, description, price, quantity
        - have submit button
        - show error if any
        - if success navigate to products page
    Backend -> completed
        - create put request for product
        - show error if any

* As a user.. I want to see list of products 
    Frontend -> 3hrs
        - show all products list in home page
            - have card with title, price, sub-description and add to card 
        - on cart click, navigate to product page
    Backend -> completed
        - create get request for products list
        - show error if any

* As a user.. I want to delete product
    Frontend -> 3hrs
        - have button in product card
        - on click delete, produc should be remove from the list
    Backend -> 3hrs
        - create delete request for product
        - if success send success message
        - show error if any
* As a user.. I want to delete product
    Frontend -> 3hrs
        - have button in product card
        - on click delete, produc should be remove from the list
    Backend -> 3hrs
        - create delete request for product
        - if success send success message
        - show error if any
