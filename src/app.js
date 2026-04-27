const { urlencoded } = require("express");
const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
require("../src/db/conn");
const { requireAuth } = require("./middleware/auth");
const { createUser, authenticateUser } = require("./models/user.model");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 80;


app.use("/static", express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SECRET || "taskify-local-dev-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
        },
    })
);


app.set("view engine", "ejs");
app.set("views", views_path);

app.get("/", (req, res) => {
    res.status(200).render("index.ejs");
});

app.get("/signup", (req, res) => {
    res.status(200).render("signup.ejs");
});

app.post("/signup", (req, res) => {
    const { SignUpUsername, SignUpEmail, SignUpPassword } = req.body;
    const user = createUser({
        username: SignUpUsername,
        email: SignUpEmail,
        password: SignUpPassword,
    });

    if (!user) {
        return res.redirect("/signup");
    }

    req.session.user = {
        username: user.username,
        email: user.email,
    };

    return res.redirect("/dashboard");
});

app.post("/login", (req, res) => {
    const { LoginEmail, LoginPassword } = req.body;
    const user = authenticateUser(LoginEmail, LoginPassword);

    if (!user) {
        return res.redirect("/signup");
    }

    req.session.user = {
        username: user.username,
        email: user.email,
    };

    return res.redirect("/dashboard");
});

app.get("/dashboard", requireAuth, (req, res) => {
    res.status(200).render("dashboard/dashboard.ejs");
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/signup");
    });
});



//* listen
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
