#YelpCamp
* Add a landing page
* Add Campgrounds page that lists all campgrounds

* Each campground has :
* Name
* Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap for styling

#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Databases
* SQL Databases (relational)
     * A collection of information/data
* NoSQL Databases (non-relational)
     * Has an interface

#Our First Mongo Commands
* mongod
* mongo
* help
* show dbs
* use
* insert
* find
* update
* remove

#Mongoose
* What is Mongoose?
* Installing and configuring Mongoose
* Setup Campground Model
* Use Campground Model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route template

 
# RESTFUL Routes
URL	                    HTTP Verb	Action
/photos/	               GET	index
/photos/new	          GET	new
/photos	               POST	create
/photos/:id	          GET	show
/photos/:id/edit	     GET	edit
/photos/:id	          PATCH/PUT	update
/photos/:id	          DELETE	destroy

# Introduction to restful routes
* Define rest and why it matters
* List all 7 RESTful Routes
* Show example of RESTful routing in practice
*REST - a mapping between HTTP routes and CRUD
*REST- Representational State Transfer

# Associations
*Discuss associations
*Discuss -> one:one ; one:many ; many:one ; many:many
*User
*Post
*Photos
*Albums
*Connect

# Embedding data
*User
*Post

# Referencing data

# Module.Exports
* Introduce module.exports
* Put the Model files in a separate directory
* We can require the model files, in the model files

# Refactor Mongoose Code
* Refactor App.js
* Create a models directory
* Use module.exports
* Require everything correctly!

# Add a seeds file
* Add a seed.js file
* Run the seeds file every time the server starts
* Helps seed dummy data to help us work with something


# Add the Comment model!
* Make our erros go away
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

ROUTES  /dogs
INDEX   /dogs/new
NEW     /dogs
CREATE  /dogs/:id

# COMMENT ROUTES
NEW campground/:id/comments/new GET
CREATE campgrounds/:id/comments POST

#Styling Show Page
* Add a sidebar
* Display comments nicely

# Intro to authentication
* What tools are we using?
    * Passport
    * Passport Local
    * Passport Local Mongoose
*Walking through the authorization flow
*Session handling using express

<!-- 
    
    AUTHENTICATION PACKAGES
    1. PASSPORT
    2. PASSPORT LOCAL
    3. PASSPORT LOCAL MONGOOSE 
    
    PACKAGE FOR MAKING SESSIONS
    1. EXPRESS-SESSION

-->

<!-- STARTING AUTHORISATION OF YELPCAMP -->

## Add user model
* Install all packages needed for auth
* Define user model

## Auth Pt.2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth Pt.3 - Login
* Add login routes
* Add login template

# Auth Pt.4 - Logout/Navbar
* Add logout Route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Refactor the routes
* Use express routes to re-organize all routes

## Users + Comments
* Associate Users and Comments
* Save author's name to a comment automatically

## Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

# Deleting Campgrounds
* Add Destroy Route
* Add Delete Button

# Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit Route for comments
* Add Edit Button
* Add Update Route

# Deleting Comments
* Add Destroy Route
* Add Delete Button

# Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware
