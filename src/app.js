const { urlencoded } = require("express");
const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
require("../src/db/conn");
const { requireAuth } = require("./middleware/auth");
const { createUser, authenticateUser, findUserByEmail } = require("./models/user.model");
const { validateSignupInput, validateLoginInput } = require("./utils/validation");
const views_path = path.join(__dirname, "../views");
const static_path = path.join(__dirname, "../static");
const app = express();
const port = process.env.PORT || 3000;

function getSignupViewModel({
    activePanel = "login",
    signupErrors = {},
    loginErrors = {},
    signupValues = {},
    loginValues = {},
} = {}) {
    return {
        activePanel,
        signupErrors,
        loginErrors,
        signupValues: {
            username: "",
            email: "",
            ...signupValues,
        },
        loginValues: {
            email: "",
            ...loginValues,
        },
    };
}

function renderSignupPage(res, viewModel = {}, status = 200) {
    return res.status(status).render("signup.ejs", getSignupViewModel(viewModel));
}


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
    renderSignupPage(res);
});

app.get("/privacy", (req, res) => {
    res.status(200).render("privacy.ejs");
});

app.post("/signup", (req, res) => {
    const { SignUpUsername, SignUpEmail, SignUpPassword } = req.body;
    const signupValues = {
        username: String(SignUpUsername || "").trim(),
        email: String(SignUpEmail || "").trim(),
    };
    const validationResult = validateSignupInput({
        username: SignUpUsername,
        email: SignUpEmail,
        password: SignUpPassword,
    });

    if (!validationResult.isValid) {
        return renderSignupPage(
            res,
            {
                activePanel: "signup",
                signupErrors: validationResult.errors,
                signupValues,
            },
            400
        );
    }

    if (findUserByEmail(SignUpEmail)) {
        return renderSignupPage(
            res,
            {
                activePanel: "signup",
                signupErrors: {
                    email: "This email is already registered.",
                },
                signupValues,
            },
            400
        );
    }

    const user = createUser({
        username: SignUpUsername,
        email: SignUpEmail,
        password: SignUpPassword,
    });

    if (!user) {
        return renderSignupPage(
            res,
            {
                activePanel: "signup",
                signupErrors: {
                    form: "Unable to create your account. Please try again.",
                },
                signupValues,
            },
            400
        );
    }

    req.session.user = {
        username: user.username,
        email: user.email,
    };

    return res.redirect("/dashboard");
});

app.post("/login", (req, res) => {
    const { LoginEmail, LoginPassword } = req.body;
    const loginValues = {
        email: String(LoginEmail || "").trim(),
    };
    const validationResult = validateLoginInput({
        email: LoginEmail,
        password: LoginPassword,
    });

    if (!validationResult.isValid) {
        return renderSignupPage(
            res,
            {
                activePanel: "login",
                loginErrors: validationResult.errors,
                loginValues,
            },
            400
        );
    }

    const user = authenticateUser(LoginEmail, LoginPassword);

    if (!user) {
        return renderSignupPage(
            res,
            {
                activePanel: "login",
                loginErrors: {
                    form: "Email or password is incorrect.",
                },
                loginValues,
            },
            400
        );
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
