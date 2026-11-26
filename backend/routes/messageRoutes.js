
const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const Message = require("../models/message");
const { messageLimiter } = require("../middleware/rateLimiter");

// CREATE NEW MESSAGE
router.post(
  "/",
  messageLimiter,

  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ max: 80 })
      .withMessage("Name must be under 80 characters."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email address.")
      .normalizeEmail()
      .isLength({ max: 254 })
      .withMessage("Email is too long."),

    body("contact")
      .optional()
      .trim()
      .isLength({ max: 30 })
      .withMessage("Contact number is too long."),

    body("subject")
      .optional()
      .trim()
      .isLength({ max: 120 })
      .withMessage("Subject is too long."),

    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required.")
      .isLength({ max: 5000 })
      .withMessage("Message must be under 5000 characters."),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, contact, subject, message } = req.body;

      const newMessage = await Message.create({
        name,
        email,
        contact: contact || "",
        subject: subject || "Portfolio Inquiry",
        message,
      });

      res.status(201).json({
        success: true,
        message: "Message sent successfully!",
        data: {
          id: newMessage._id,
          name: newMessage.name,
          email: newMessage.email,
          status: newMessage.status,
          createdAt: newMessage.createdAt,
        },
      });

    } catch (error) {
      console.error("Create Message Error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to send message.",
      });
    }
  }
);

module.exports = router;
