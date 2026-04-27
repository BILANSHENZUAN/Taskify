function normalizeText(value = "") {
    return String(value).trim();
}

function isValidEmail(email = "") {
    const normalizedEmail = normalizeText(email);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(normalizedEmail);
}

function validateSignupInput({ username, email, password }) {
    const errors = {};
    const normalizedUsername = normalizeText(username);
    const normalizedEmail = normalizeText(email);
    const normalizedPassword = String(password || "");

    if (!normalizedUsername) {
        errors.username = "Username is required.";
    }

    if (!normalizedEmail) {
        errors.email = "Email is required.";
    } else if (!isValidEmail(normalizedEmail)) {
        errors.email = "Enter a valid email address.";
    }

    if (normalizedPassword.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

function validateLoginInput({ email, password }) {
    const errors = {};
    const normalizedEmail = normalizeText(email);
    const normalizedPassword = String(password || "");

    if (!normalizedEmail) {
        errors.email = "Email is required.";
    }

    if (!normalizedPassword) {
        errors.password = "Password is required.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

module.exports = {
    isValidEmail,
    validateSignupInput,
    validateLoginInput,
};
