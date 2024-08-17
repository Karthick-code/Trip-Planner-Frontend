Welcome to Trip Planner 
Here in this project I have used React JS, Node JS, Express JS, MongoDB, and Mongoose.

HOME:
In home page it displaya the destinations that are added in the database.

LOGIN:
In login page we can login with the existing user details.
Only after the login the user can access all orthe pages.

SIGNUP:
In signup page we can create a new user with the details like name, email and password. 
After the signup the user is directly logged in to the website.

ADD-DESTINATION:
In the add destination page we can add the destinations details like title, description, image, location and rating.

USER:
In user page we can see the user details like nameand email. the user can also update the user details through update user button. in the same page i have linked all other pages also for reference.
There is an additional content in user page is Expenses. The expense amount is displayed with related to travel plan.
there is also an setExpense button which will help the user to set limit in the expense.

TRAVEL-PLAN:
In the travel plan  page we can see the travel plan details like title, description, image, location and rating. and als we can create new travel plan using the button new travel plan.
these travel plan details are also displayed in the travelplan page.

TODO:
In todos of user is displayed at first. if it is a new user login then it will display no todos yet.
User can create new todos using the button new todo. it redirects to create todo page.user can create with title and description for todo. 

TRAVEL-BOOKING:
In travel booking page we can see the travel booking details like travel from, to, date, and mode of transport. and also we can create new travel booking using the buttons in menu bar that is flight,train and bus menu.
it redirects to booking for flight,train and bus each respectively. single users travel in anymode of transport is stored in same database.

ACCOMMODATION:
In accommodation page we can see search for accommodation place and type of stay like hotel, vacation rentals or hostels.
for accommodation i created a new collection in database and stored the data in it.

Note:
Menubar in the top is manually opened and closed. 
i also tried to add icons in menu bar but there is a problem in it, as i used map fuction to add menus.
booking for transports i have use apis for flights and trains.
it has limited number of requests to get data. the apis are from rapid api
for buses i have created a new collection in database and stored the data in it.
Only drawback when the user add new destination the image is not displayed in the home page, because while uploading the image is uploaded as image name. i can't able change the image as link to display.
