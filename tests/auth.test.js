const { requireAuth } = require("../src/middleware/auth");

describe("requireAuth middleware", () => {
    test("redirects unauthenticated users to /signup", () => {
        const req = {};
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();

        requireAuth(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith("/signup");
        expect(next).not.toHaveBeenCalled();
    });

    test("calls next for authenticated users", () => {
        const req = {
            session: {
                user: {
                    email: "user@example.com",
                },
            },
        };
        const res = {
            redirect: jest.fn(),
        };
        const next = jest.fn();

        requireAuth(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.redirect).not.toHaveBeenCalled();
    });
});
