const usersByEmail = new Map();

function normalizeEmail(email = "") {
    return String(email).trim().toLowerCase();
}

function createUser({ username, email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const normalizedUsername = String(username || "").trim();
    const normalizedPassword = String(password || "");

    if (!normalizedUsername || !normalizedEmail || !normalizedPassword) {
        return null;
    }

    if (usersByEmail.has(normalizedEmail)) {
        return null;
    }

    const user = {
        username: normalizedUsername,
        email: normalizedEmail,
        password: normalizedPassword,
    };

    usersByEmail.set(normalizedEmail, user);

    return user;
}

function authenticateUser(email, password) {
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = String(password || "");
    const user = usersByEmail.get(normalizedEmail);

    if (!user || user.password !== normalizedPassword) {
        return null;
    }

    return user;
}

module.exports = {
    createUser,
    authenticateUser,
};
