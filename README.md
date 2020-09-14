
# **Vegmazona** #
Web based project inspired to provide e-kirana platform for vendors using react and node.js




## **Authors** ##

*Dibyarupa Jena  <dibyarupajena@gmail.com>*


## **Self-reference** ##

1. Created an index.html of three areas

    - Header
    - Main
    - Footer


2. Created a grid container for products display

    - div grid-container class created
    - class styled, display as grid


3. Classes for header, main, footer created and styled


4. Grid area column and group set in style sheet

5. Effects styled to links on hovering
    - header links, cart and signin added


6. Homescreen created

    - Product, image, price, rating etc added and styled


7. Sidebar section created

    - hamburger menu added and styled
    - Shopping categories made
    - opening and closing functions onclick to x
    - script tags added at the end


8. Created react app and shifted files

    - to create app of the name "frontend" from terminal:
    - ``` npx create-react-app frontend ```
    
    - ```cd frontend``` (Inside created react app)

    - ```npm start``` (will open the app in default browser)

    - all html(from index.html inbetween the body tags) is copied to app.js inside src folder

    - all css(style.css in this case) is copied to index.css inside src folder

    - images copied to created images folder in public folder




9. Products rendered

    - Instead of static data, dynamic array data is created
    - Tomato replaced by {product.name} etc dynamic data
    - data.js is created and imported in app.js
    - Object containing objects of producted created

10. Two screens created

    - react-router-dom installed : 
    
    - ```cd frontend ```
    
    - ```npm install react-router-dom  ```

    - <BrowserRouter> start and end tags are closed across the divs  of app.js
    - ```<Routhe path="/" component={HomeScreen} />``` inside content class of main class of app.js, also 
    done for product screen. This means path "/" or "/products/:id" refer to component HomeScreen or ProductScreen.
    - Inside src, created folder Screens, inside which created HomeScreen.js with a function 
    homescreen(props) taking parameter, returning text HomeScreen. export default homescreen(why?). Same done for productScreen.js ...
    - Import both files to app.js 
    - also import ``` import {BrowserRouter, Routhe} from 'react-router-dom';``` in app.js
    - the ul component of product is cut pasted into homescreen.js and import as done

11. Linking done
    - Instead of < a href > tags search directs through changed url id on click
    - ```  <Link to={'/product/' + product._id}>``` 
     for eg- localhost3000/product/2472/    

12. Product details
    - In the product screen in the console log the product id of the product that got clicked is fetched. Line 6
    - Const named product is defined which fetches and stores the require product object from data by matching the product id with console id.
    - using dot operator, various needed details are fetched into page like {product.name}, {product.image} etc.
    - Styling the divs
        -in index.css in product details
    - third div, details-action
    - frontend completed, next is backend

## (BACKEND STARTS) ##

13. Creating node server(backend)
    - Create a backend folder inside amazona(main folder)
    - create new file server.js inside backend folder
    - to create a node application inside amazona folder, inside terminal, amazona folder
    ```npm init```
    - Enter yes for the prompts followed and at the end you have package.json

14. Serving list of products to the client
    - Inside server.js
    - to create web server, going to use express(simple server) module, hence the import
    - hence in the terminal, ``` npm install express ```   
    - to create a endpoint, path app.get line 8
        - 2nd parameter of get is a handler function which responds to this request
        - for data.products, we use from data.js
    - *copy data.js from src to backend folder*       
    - app.listen command to run the server
    - then in terminal, have to type node address of server; in this case ``` node backend/server.js ```
    - error occurs, need to install some packages
    - ```npm install @babel/cli @babel/core @babel/node @babel/preset-env nodemon --save-dev ``` (save dev will   save the packages in developer section of package.json, nodemon helps us start or stop the server whenever there is a change in the code)
    - created file .babelrc under amazona, written inside it
    - inside package.json under amazona, edited under script,(also type, and data.js error)
    - then ``` npm start ```, runs in the mention host 5000; localhost:5000/api/products is our backend api

15. Fetching data from server
    - first in amazona, ``` npm start ``` to run the backend then open another terminal, ```cd frontend ``` and ``` npm start``` to start the frontend
    - inside package.json, write the proxy part(port no of your node)  
    - next to fetch data, using hooks
        - Go to homescreen/screens/frontend
        - inside homescreen function(check the imports too), use state and use effect(no cleanup; empty inputs because when all the lines down for products is rendered then only it will run)
    - then install axios package
        - new terminal, ``` cd frontend ```
        - ``` npm install axios ```
        - import axios     
    - no more need of import, no need of data.js file in frontend

16. Manage state redux(redux as state manager, to expanding to higher state)
    - good diagram for reference in the video for redux, with parts; ```npm install react-redux```
        1. create store 
            - creating store.js inside frontend. src
        2. reducers
            - create a folder under src named reducers
            - inside it a file productReducers.js and write ..  
            - next made changes to store.js
            - next made changes to index.js
            - thunk; in store.js ;  ```npm install redux-thunk``` // ```npm install redux --save``` to solve error 

         

        3. Error, loading page
            - npm installed after deleting many times node modules and package-lock.json file
            - Error resolved when imports in HomeScreen.js and ProductScreen.js when converted (for eg) './  node_modules/react' to 'react'
        4. Instead of getting data using useState, will now use/define useSelector    
            - const dispatch, and functions, deleting fetchdata, imports
            - inside src, create folder named actions, inside which- file productActions.js
            - Write inside productActions for const defining listProducts
            - Loading error above the div, with if else, error or result
            - In the console log, in network, in xhr can see products- coming from server
            - REDUX helpful to manage complex states in our applications

17. Adding redux(state management system) to the product details page
    - again define variable(productDetails) using useSelectors
    - again also use dispatch{ dispatch(action_name())}- used as an effect
    - In ProductScreen.js, after the div with classname= backtoresults, put loading? error? inside which cut, paste the divs details
    -useSelector, useDispatch in ProductScreen.js, HomeScreen.js
    - now we need to define a web api under server.js to server the address inside actions when user enters product api and productid
    - enriching the endpoint api
    - **whatever done with product list(changing useState to useEffects{HomeScreen.js, ProductScreen.js}, api call{productActions, async, await, dispatch api address}, constants{productConstants.js}, reducers{productReducers.js}, combine reducers{store.js}) need to be done for product details**
    - In productScreen, inside dispatch, need to put the productId that user enters so => dispatch(detailsProduct(props.match.params.id))
    - now product details has been added to redux, you are see when false in redux, a small loadin... comes

18. Implementing add to cart 
    - Managing qty(quantity)
        - Inside productscreen, define a hook for qty for grabbing qty entered by the user, then changes in qty ul to store value of what user clicks in {qty} using onChange handler
        - countInStock= qty need to come from server/ instead of static options
    - Add to cart
        - inside productscreen.js, created handleaddtocart function, which will redirect user to cart, 
        - mentioning url to be directed inside it => props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
        - then in button add to cart button, put this function on click.. (add to {cart}, the product of this {productId}, {qty} no of times)
    

19. Shopping cart screen
    - In app.js, add the route path for cart under div class  content
    - create CartScreen.js under screens
        - inside cartscreen function const qty = props.location.search? Number(props.location.search.split("=")[1]):1; /* to search for the qty in the url, converting the string into num, spliting the string at = sign and choosing 1 character from the right*/
        - can use useEffect function now
    - create cartActions under actions
    - create cartreducer under reducers(didnt understand the code), then changes in store.js
    - then make cartConstants
    - *didnt get the cart-actions* in cartScreen.js
    - style cart, cart-list and cart-action
    - implemented delete action in cart
    - implemented checkout by redirecting to sigin page
    
20. Cookies
    - Upon refreshing the cart, only the last time added to cart stays, so need to add cookies
    - need to install cookies
        - ```cd frontend```
        - ```npm install js-cookie```
    - use in cartactions, starting with import cookies
    - using getstate 
    - then store.js
    - Upon refresh now items stay in the cart and price get updated
    - **fully functional shopping cart implemented**