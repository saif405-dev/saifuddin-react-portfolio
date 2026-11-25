
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const User = require("./models/User");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = (question) =>
    new Promise((resolve) => rl.question(question, resolve));

async function createAdmin() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env");
        }

        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ role: "admin" });

        if (existingAdmin) {
            throw new Error("An admin account already exists.");
        }

        const email = (await ask("Admin email: "))
            .trim()
            .toLowerCase();

        const password = await ask("Admin password: ");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Please enter a valid email.");
        }

        if (password.length < 12 || password.length > 128) {
            throw new Error("Password must be between 12 and 128 characters.");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await User.create({
            email,
            password: passwordHash,
            role: "admin",
        });

        console.log("Admin account created successfully!");

    } catch (error) {
        console.error("Admin creation failed:", error.message);
        process.exitCode = 1;

    } finally {
        rl.close();

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
}

createAdmin();
