document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector("[data-cookie-banner]");
    const acceptButton = document.querySelector("[data-cookie-accept]");
    const consentKey = "taskify_cookie_consent";

    if (!banner || !acceptButton) {
        return;
    }

    function getStoredConsent() {
        try {
            return window.localStorage.getItem(consentKey);
        } catch (error) {
            return null;
        }
    }

    function setStoredConsent() {
        try {
            window.localStorage.setItem(consentKey, "accepted");
        } catch (error) {
            // Ignore storage errors and fall back to per-visit display.
        }
    }

    if (getStoredConsent() !== "accepted") {
        banner.hidden = false;
    }

    acceptButton.addEventListener("click", () => {
        setStoredConsent();
        banner.hidden = true;
    });
});
