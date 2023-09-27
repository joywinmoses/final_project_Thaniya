const express=require("express")
const mongoose=require("mongoose")
const body=require("body-parser")
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))


mongoose.connect("mongodb+srv://cjoywinmoses:<password>@cluster0.ziy6kkr.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true})



const userschema = new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    email:String,
    phone:String,
    address:String

});
    
const usermodel=mongoose.model("user",userschema)


const bookingschema = new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    email:String,
    phone:String,
    address:String,
    location:String,
    guests:String,
    arrivals:String,
    leaving:String

});
    
const bookingmodel=mongoose.model("booking",bookingschema)

app.get("/",function(req,res){

        res.render('index')
    
})

app.post("/",function(req,res){
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login.ejs'); // Render the patient.ejs template
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs'); // Render the patient.ejs template
});

app.get('/book', (req, res) => {
    res.render('book.ejs'); // Render the patient.ejs template
});




app.post('/login', (req, res) => {
    var username = req.body.user_name;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;

    const userdl = new usermodel({ username: username, password: password, name: name, email: email, phone: phone, name: name, address: address,});

    userdl.save()
        .then(() => {
            // Data was saved successfully, render the template or perform other actions.
            res.render("login.ejs");
        })
        .catch(err => {
            // Handle any errors that occurred during the save operation.
            console.error("Error saving user data:", err);
            res.status(500).send("Error saving user data"); // Send an error response
        });
});


app.post('/index', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var location = req.body.location;
    var guests = req.body.guests;
    var arrivals = req.body.arrivals;
    var leaving = req.body.leaving;


    const bookingdl = new bookingmodel({ username: username, password: password, name: name, email: email, phone: phone, name: name, address: address,  location: location, guests: guests, arrivals: arrivals, leaving: leaving});

    bookingdl.save()
        .then(() => {
            // Data was saved successfully, render the template or perform other actions.
            res.render("index.ejs");
        })
        .catch(err => {
            // Handle any errors that occurred during the save operation.
            console.error("Error saving user data:", err);
            res.status(500).send("Error saving user data"); // Send an error response
        });
});




app.listen(process.env.PORT ||3000,function(){
    console.log("Server is up and running")
})