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