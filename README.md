1. Introduction

2. Install Tools

3. Create React App

4. Create Git Repository

5. List Products
   - create products array
   - add product images
   - render products
   - style products

6. Add page routing
   - npm i react-router-dom
   - create route for home screen
   - create router for product screen
   
7. Create Node.JS Server
   - run npm init in root folder
   - Update package.json set type: module
   - Add .js to imports
   - npm install express
   - create server.js
   - add start command as node backend/server.js
   - require express
   - create route for / return backend is ready.
   - move products.js from frontend to backend
   - create route for /api/products
   - return products
   - run npm start

8. Fetch Products From Backend
   - set proxy in package.json
   - npm install axios
   - use state hook
   - use effect hook
   - use reducer hook

9. Manage State By Reducer Hook
   - define reducer
   - update fetch data
   - get state from usReducer

10. Add bootstrap UI Framework
   - npm install react-bootstrap bootstrap
   - update App.js   

11. Create Product and Rating Component
   - create Rating component
   - Create Product component
   - Use Rating component in Product component

12. Create Product Details Screen
   - fetch product from backend
   - create 3 columns for image, info and action
   
13. Create Loading and Message Component
   - create loading component
   - use spinner component
   - craete message component
   - create utils.js to define getError fuction

14. Create React Context For Add Item To Cart
   - Create React Context
   - define reducer
   - create store provider
   - implement add to cart button click handler

15. Complete Add To Cart
   - check exist item in the cart
   - check count in stock in backend

16. Create Cart Screen
   - create 2 columns
   - display items list
   - create action column

17. Complete Cart Screen
   - click handler for inc/dec item
   - click handler for remove item
   - click handler for checkout

18. Create Signin Screen
   - create sign in form
   - add email and password
   - add signin button

19. Connect To MongoDB Database
   - create atlas monogodb database
   - install local mongodb database
   - npm install mongoose
   - connect to mongodb database  

20. Seed Sample Products
   - create Product model
   - create seed route
   - use route in server.js
   - seed sample product

21. Seed Sample Users
   - create user model
   - seed sample users

22. Create Signin Backend API
   - create signin api
   - npm install jsonwebtoken
   - define generateToken

23. Complete Signin Screen
   - handle submit action
   - save token in store and local storage
   - show user name in header

24. Create Shipping Screen
   - create form inputs
   - handle save shipping address
   - add checkout wizard bar

25. Create Sign Up Screen
   - create input forms
   - handle submit
   - create backend api

26. Implement Select Payment Method Screen
   - create input forms
   - handle submit

27. Create Place Order Screen
   - show cart items, payment and address
   - calculate order summary

28. Implement Place Order Action
   - handle place order action
   - create order create api

29. Create Order Screen
   - create backend api for order/:id
   - fetch order api in frontend
   - show order information in 2 cloumns

30. Pay Order By PayPal
   - generate paypal client id
   - create api to return client id
   - install react-paypal-js
   - use PayPalScriptProvider in index.js
   - use usePayPalScriptReducer in Order Screen
   - implement loadPaypalScript function
   - render paypal button
   - implement onApprove payment function
   - create pay order api in backend

31. Display Order History
   - create order screen
   - create order history api
   - use api in the frontend

32. Create Profile Screen
   - get user info from context
   - show user information
   - create user update api
   - update user info

33. Add Sidebar and Search Box
   - add sidebar
   - add search box

34. Create Search Screen
   - show filters
   - create api for searching products
   - display results