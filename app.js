// 1- Summon express
const express = require("express");
const app = express();

// 2- Set urlencoded to capture data form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 3- Summon dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

// 4- Public Directory
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));
// console.log(__dirname);

// 5- Set EJS template
app.set("view engine", "ejs");

// 6- Summon Bcryptjs
const bcryptjs = require("bcryptjs");

// 7- Session variables
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// 8 - Summon the database connection module
const connection = require("./database/db");

// 9 - Routes

// app.get("/", (req, res) => {
//   res.render("index", { msg: "reading this message" });
// });

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// 10 - Register
app.post('/register', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', {user:user, name:name, rol:rol, pass:passwordHash}, async(error, results) => {
        if(error) {
            console.log(error);
        } else {
            // res.send('Successful insertion')
            res.render('register', {
                alert:true,
                alertTitle:"Registration",
                alertMessage:"¡Successful Registration!",
                alertIcon:'success',
                showConfirmButton:false,
                timer:5000,
                ruta:''
            })
        }
    })
})

// 11 - Authentication
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    if(user && pass) {
        connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                // res.send('Wrong username or password')
                res.render('login', {
                    alert:true,
                    alertTitle:"Error",
                    alertMessage:"Wrong username or password",
                    alertIcon:'error',
                    showConfirmButton:false,
                    timer:5000,
                    ruta:'login'
                });
            } else {
                req.session.loggedin = true;
                req.session.name = results[0].name
                // res.send('¡Successful Login!')
                res.render('login', {
                    alert:true,
                    alertTitle:"¡Successful Login!",
                    alertMessage:"¡Correct Login!",
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer:5000,
                    ruta:''
                });
            }
        })
    } else {
        // res.send('Please enter a valid username and password');
        res.render('login', {
            alert:true,
            alertTitle:"¡Warning!",
            alertMessage:"Please enter a valid username and password",
            alertIcon:'warning',
            showConfirmButton:false,
            timer:5000,
            ruta:'login'
        });
    }
})

// 12 - Auth pages
app.get('/', (req, res) => {
    if(req.session.loggedin) {
        res.render('index',{
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name:'Must log in'
        })
    }
})

// 13 - Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() =>{
        res.redirect('/')
    })
})


app.listen(3000, (req, res) => {
  console.log("Server running in http://localhost:3000");
});