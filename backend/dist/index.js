import express, {} from 'express';
import "dotenv/config";
import http from 'http';
import crypto from "crypto";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    },
}));
app.post("/webhook/github", (req, res) => {
    const signature = req.headers["x-hub-signature-256"];
    const secret = "supersecret123";
    const hash = "sha256=" +
        crypto
            .createHmac("sha256", secret)
            .update(JSON.stringify(req.body))
            .digest("hex");
    if (hash !== signature) {
        console.log("Invalid signature");
        return res.status(401).send("Invalid signature");
    }
    const event = req.headers["x-github-event"];
    console.log("Event received:", event);
    if (event === "push") {
        const { repository, commits } = req.body;
        console.log("Repository:", repository.full_name);
        commits.forEach((commit) => {
            console.log("Commit message:", commit.message);
            console.log("Added:", commit.added);
            console.log("Modified:", commit.modified);
            console.log("Removed:", commit.removed);
            console.log("--------------");
        });
    }
    res.status(200).send("Webhook received");
});
app.get("/", (req, res) => {
    res.send("Server running");
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
