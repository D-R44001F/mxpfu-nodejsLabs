const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  //res.send(users);
  //res.send("Yet to be implemented") //This line is to be replaced with actual return value
    res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Exract email parameters from the request URL
  const email = req.params.email;

  // Filter the users array by mail
  let filtered_users = users.filter((user) => user.email === email);

  // Send filtered_users array as the response to the client
  res.send(filtered_users); 
  
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Push a new user object into the user arrray
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB 
  })
  res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email and find user with matching parameter
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email );

  if (filtered_users.length > 0){
        // select first match and update attributes
        let filtered_user = filtered_users[0];

        // Extract and update DOB if provided

        let DOB = req.query.DOB;
        if (DOB){
            filtered_users.DOB = DOB;
        }

        users = users.filter((user) => user.email != email);
        users.push(filtered_user);

        // Send success message
        res.send(`User with the email ${email} updated.` )
    } else {
        //send error
        res.send("Unable to find user");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
   // Extract the email parameter from the request URL
   const email = req.params.email;
   // Filter the users array to exclude the user with the specified email
   users = users.filter((user) => user.email != email);
   // Send a success message as the response, indicating the user has been deleted
   res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
