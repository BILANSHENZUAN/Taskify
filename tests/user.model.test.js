describe("user model", () => {
    function loadUserModel() {
        jest.resetModules();
        return require("../src/models/user.model");
    }

    test("creates a user with normalized values", () => {
        const { createUser } = loadUserModel();
        const user = createUser({
            username: "  Alice  ",
            email: "  Alice@Example.com  ",
            password: "password123",
        });

        expect(user).toEqual({
            username: "Alice",
            email: "alice@example.com",
            password: "password123",
        });
    });

    test("finds a user by normalized email", () => {
        const { createUser, findUserByEmail } = loadUserModel();
        createUser({
            username: "Alice",
            email: "alice@example.com",
            password: "password123",
        });

        expect(findUserByEmail("  ALICE@example.com ")).toEqual({
            username: "Alice",
            email: "alice@example.com",
            password: "password123",
        });
    });

    test("rejects duplicate email registrations", () => {
        const { createUser } = loadUserModel();
        createUser({
            username: "Alice",
            email: "alice@example.com",
            password: "password123",
        });

        const duplicateUser = createUser({
            username: "Alice 2",
            email: " ALICE@example.com ",
            password: "password456",
        });

        expect(duplicateUser).toBeNull();
    });

    test("returns null for invalid user creation input", () => {
        const { createUser } = loadUserModel();

        expect(
            createUser({
                username: "   ",
                email: "alice@example.com",
                password: "password123",
            })
        ).toBeNull();
    });

    test("authenticates a user with the correct password", () => {
        const { createUser, authenticateUser } = loadUserModel();
        createUser({
            username: "Alice",
            email: "alice@example.com",
            password: "password123",
        });

        expect(authenticateUser("alice@example.com", "password123")).toEqual({
            username: "Alice",
            email: "alice@example.com",
            password: "password123",
        });
    });

    test("rejects authentication with an incorrect password", () => {
        const { createUser, authenticateUser } = loadUserModel();
        createUser({
            username: "Alice",
            email: "alice@example.com",
            password: "password123",
        });

        expect(authenticateUser("alice@example.com", "wrongpass")).toBeNull();
    });

    test("returns null when a user cannot be found", () => {
        const { findUserByEmail, authenticateUser } = loadUserModel();

        expect(findUserByEmail("missing@example.com")).toBeNull();
        expect(authenticateUser("missing@example.com", "password123")).toBeNull();
    });
});
