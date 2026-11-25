
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Message = require("../models/Message");
const protect = require("../middleware/authMiddleware");

// GET ALL MESSAGES (Admin Only)
router.get("/messages", protect, async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);

        const limit = Math.min(
            50,
            Math.max(1, parseInt(req.query.limit, 10) || 20)
        );

        const skip = (page - 1) * limit;

        const [messages, total] = await Promise.all([
            Message.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),

            Message.countDocuments(),
        ]);

        res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            messages,
        });

    } catch (error) {
        console.error("Get Messages Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch messages.",
        });
    }
});


// UPDATE MESSAGE STATUS (Admin Only)
router.patch("/messages/:id/status", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid message ID.",
            });
        }

        const allowedStatuses = ["unread", "read", "replied"];

        if (
            typeof status !== "string" ||
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Status must be unread, read, or replied.",
            });
        }

        const message = await Message.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: `Message status updated to ${status}.`,
            data: message,
        });

    } catch (error) {
        console.error("Update Message Status Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update message status.",
        });
    }
});


// DELETE MESSAGE (Admin Only)
router.delete("/messages/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid message ID.",
            });
        }

        const message = await Message.findByIdAndDelete(id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Message deleted successfully.",
        });

    } catch (error) {
        console.error("Delete Message Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete message.",
        });
    }
});

module.exports = router;
