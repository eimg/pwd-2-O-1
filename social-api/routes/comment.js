const express = require("express");
const router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth.js");

// Create a new comment
router.post("/", auth, async (req, res) => {
    const { content, postId } = req.body;

    if (!content) {
        return res.status(400).json({ msg: "content is required" });
    }

    if (!postId) {
        return res.status(400).json({ msg: "postId is required" });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                userId: req.user.id,
                postId: Number(postId)
            },
            include: {
                user: true
            }
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Delete a comment
router.delete("/:id", auth, async (req, res) => {
    const id = req.params.id;

    try {
        const comment = await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        });

        res.json(comment);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = { commentRouter: router };
