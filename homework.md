- Create a repository
- Initialize the repository
- node_module, package.json , package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write a request handlers for /test , hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilda ( ^ vs ~)

- Initalize git
- -gitignore
- create a remote repo on github
- push all code to remote origin
- play with routes and extensions ex. /hello , / , /hello/2 , /xyz
- order of the routes matter a lot
- install postman app and make a workspace/collection > test API call
- write logic to handle GET,POST,PATCH,DELETE API calls and test them on Postman
- explore routing and use of ? , + , () , \* in the routes
- use of regex in routes /a/ , /.\*fly$/
- reading the query params in the routes
- reading the dynamic routes

- Multiple route handlers - play with the code
- next()
- next function and errors along with res.send()
- app.use("/route", rh , [rh2,rh3],rh4,rh5)
- what is middleware . why do we need it
- how express js basically handles requests behind the scenes
- difference b/w app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes , except /user/login
- error handling using app.use("/",(err,req,res,next) = {})

- create a free cluster on MongoDB official website (Mongo Atlas)
- install mongoose library
- connect your application to the database <Connection-url"/devTinder>
- call the connectDB function and connect to the database
- create a userSchema and userModel
- create a post / signup to add data to database
- push some documents using API calls from postman
- error handling using try catch

- js object vs json
- add the express.json middleware to your app
- make the signup api dynamic to recieve data from the end user
- User.findOne with duplicate email
- api - get user by email
- api - feed api - get /feed - get all the users from the database
- api - get user by id
- create a user delete api
- difference between patch and put
- api - update a user
- explore the mongoose documentation for model methods
- what are options in a Model.findOneByUpdate method , explore more  
  about it
- api - update the user with email ID

- explore schematype options from the documentation
- add required, unique, lowercase, minLength, maxLength,trim
- add default
- create a custom validate function for gender
- imporve the DB schema - PUT ALL appropriate validation on each field
- add timestamps to the userSchema
- add api level validation on Patch request & signup post api
- data saniztization - add api validation for each field
- explore validator library functions and use validator function for password , email and photoUrl
- never trust req.body

- validate data in signup api
- install bcrypt package
- create passwordhash using bcrypt.hash and save the user with encrypted password
- create login api
- compare passwords and throw errors if email or password is invalid.

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile api and check if you get the cookie back and read it from profile api
- install jsonwebtoken
- in login api , after email and password validation , create a jwt token and send it to user
- read the cookies inside your profile api and find the logged in user
- userAuth middleware
- add the userAuth middle in profile api and a new sendConnection api
- set the expiry of jwt token and cookies to 7 days.
- create userSchema method to compare password(passwordByInputUser)

- explore tinder apis
- create a list all api you can of in dev tinder
- group multiple routes under respective router
- read documentation for express.Router
- create routes folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter
- import these routers in app.js
- create post /logout api
- create patch /profile/edit
- create patch /profile/password api => forgot password api
- make sure you validate all data in every POST,PATCH API's

- create connectioonRequestSchema
- send connection request api
- proper validation of data
- think about all corner cases
- $or query $and query in mongoose
- read more about indexes in MongoDB
- why do we need index in DB?
- what is the advantages and disadvantages of creating index
- read this article about compound indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- always think about corner cases

- write code with proper validation for POST /request/review/:status/:requestId
- thought process - POST vs GET
- read about ref and populate https://mongoosejs.com/docs/populate.html
- create GET /user/requests/recieved with all the checks
- create GET /user/connections

- Logic for GET /feed API
- Explore the $nin , $and , $ne and other query operators


NOTES
/feed?page=1&limit=10 => first 10 users 1-10 => .skip(0) & .limit(10)
/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

.skip() & .limit()
skio = (page-1)\*limit
