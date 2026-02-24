(function () {
    function getFirebaseDb() {
        const config = window.BOTTLR_FIREBASE_CONFIG || {};
        if (!window.firebase) {
            console.warn("Firebase SDK not loaded.");
            return null;
        }
        if (!config.projectId || config.projectId === "REPLACE_ME") {
            console.warn("Firebase config is not set. Update firebase-config.js.");
            return null;
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        return firebase.firestore();
    }

    async function saveSubmission(payload) {
        const db = getFirebaseDb();
        if (!db) {
            throw new Error("Firebase unavailable");
        }
        await db.collection("contact_submissions").add({
            ...payload,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    window.handleContact = async function (e) {
        e.preventDefault();
        const btn = document.getElementById("contactBtn");
        const emailInput = document.getElementById("contactEmail");
        const payload = {
            source: "index",
            email: emailInput ? emailInput.value.trim() : "",
            page: window.location.pathname
        };

        if (!payload.email) return;
        if (btn) btn.disabled = true;

        try {
            await saveSubmission(payload);
            if (btn) {
                btn.textContent = "✓ sent";
                btn.style.background = "#d2f1db";
                btn.style.color = "#34A853";
            }
            if (emailInput) emailInput.value = "";
        } catch (err) {
            console.error("Contact form submit failed:", err);
            if (btn) {
                btn.disabled = false;
                btn.textContent = "try again";
            }
        }
    };

    window.handleFundingContact = async function (e) {
        e.preventDefault();
        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const messageInput = document.getElementById("contactMessage");
        const submitBtn = document.getElementById("contactSubmit");
        const status = document.getElementById("contactStatus");

        const payload = {
            source: "funding",
            name: nameInput ? nameInput.value.trim() : "",
            email: emailInput ? emailInput.value.trim() : "",
            message: messageInput ? messageInput.value.trim() : "",
            page: window.location.pathname
        };

        if (!payload.email || !payload.message) return;
        if (submitBtn) submitBtn.disabled = true;
        if (status) status.textContent = "sending...";

        try {
            await saveSubmission(payload);
            if (status) status.textContent = "Thanks! Submitted successfully.";
            if (submitBtn) submitBtn.textContent = "sent";
            if (nameInput) nameInput.value = "";
            if (emailInput) emailInput.value = "";
            if (messageInput) messageInput.value = "";
        } catch (err) {
            console.error("Funding form submit failed:", err);
            if (status) status.textContent = "Could not submit. Check Firebase config.";
            if (submitBtn) submitBtn.disabled = false;
        }
    };

    window.handleWaitlist = async function (e) {
        e.preventDefault();
        const nameInput = document.getElementById("waitlistName");
        const emailInput = document.getElementById("waitlistEmail");
        const roleInput = document.getElementById("waitlistRole");
        const submitBtn = document.getElementById("waitlistSubmit");
        const status = document.getElementById("waitlistStatus");

        const payload = {
            source: "waitlist",
            name: nameInput ? nameInput.value.trim() : "",
            email: emailInput ? emailInput.value.trim() : "",
            role: roleInput ? roleInput.value : "",
            page: window.location.pathname
        };

        if (!payload.email || !payload.role) return;
        if (submitBtn) submitBtn.disabled = true;
        if (status) status.textContent = "joining...";

        try {
            await saveSubmission(payload);
            if (status) status.textContent = "You're in. We'll keep you posted.";
            if (submitBtn) submitBtn.textContent = "joined";
            if (nameInput) nameInput.value = "";
            if (emailInput) emailInput.value = "";
            if (roleInput) roleInput.value = "";
        } catch (err) {
            console.error("Waitlist submit failed:", err);
            if (status) status.textContent = "Could not submit. Try again.";
            if (submitBtn) submitBtn.disabled = false;
        }
    };

    window.handleWaitlistInline = async function (e) {
        e.preventDefault();
        const form = e.target;
        const emailInput = form.querySelector('input[name="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const status = form.querySelector('[data-role="status"]');
        const source = form.dataset.source || "index-inline";

        const payload = {
            source,
            email: emailInput ? emailInput.value.trim() : "",
            page: window.location.pathname
        };

        if (!payload.email) return;
        if (submitBtn) submitBtn.disabled = true;
        if (status) status.textContent = "joining...";

        try {
            await saveSubmission(payload);
            if (status) status.textContent = "You're in. We'll keep you posted.";
            if (submitBtn) submitBtn.textContent = "joined";
            if (emailInput) emailInput.value = "";
        } catch (err) {
            console.error("Inline waitlist submit failed:", err);
            if (status) status.textContent = "Could not submit. Try again.";
            if (submitBtn) submitBtn.disabled = false;
        }
    };
})();
