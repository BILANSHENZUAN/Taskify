const {
    isValidEmail,
    validateSignupInput,
    validateLoginInput,
} = require("../src/utils/validation");

describe("validation helpers", () => {
    test("rejects an empty signup username", () => {
        const result = validateSignupInput({
            username: "   ",
            email: "user@example.com",
            password: "password123",
        });

        expect(result.isValid).toBe(false);
        expect(result.errors.username).toBe("Username is required.");
    });

    test("rejects an invalid signup email", () => {
        const result = validateSignupInput({
            username: "Alice",
            email: "not-an-email",
            password: "password123",
        });

        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBe("Enter a valid email address.");
    });

    test("rejects a short signup password", () => {
        const result = validateSignupInput({
            username: "Alice",
            email: "user@example.com",
            password: "short",
        });

        expect(result.isValid).toBe(false);
        expect(result.errors.password).toBe("Password must be at least 8 characters.");
    });

    test("accepts valid signup input", () => {
        const result = validateSignupInput({
            username: "Alice",
            email: "user@example.com",
            password: "password123",
        });

        expect(result).toEqual({
            isValid: true,
            errors: {},
        });
    });

    test("rejects a login when the email is empty", () => {
        const result = validateLoginInput({
            email: "   ",
            password: "password123",
        });

        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBe("Email is required.");
    });

    test("rejects a login when the password is empty", () => {
        const result = validateLoginInput({
            email: "user@example.com",
            password: "",
        });

        expect(result.isValid).toBe(false);
        expect(result.errors.password).toBe("Password is required.");
    });

    test("accepts valid login input", () => {
        const result = validateLoginInput({
            email: "user@example.com",
            password: "password123",
        });

        expect(result).toEqual({
            isValid: true,
            errors: {},
        });
    });

    test("recognizes valid and invalid email formats", () => {
        expect(isValidEmail("user@example.com")).toBe(true);
        expect(isValidEmail("bad-email")).toBe(false);
    });
});
