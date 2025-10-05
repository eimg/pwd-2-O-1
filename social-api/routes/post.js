const express = require("express");
const router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth.js");

router.get("/", async (req, res) => {
	const posts = await prisma.post.findMany({
		take: 20,
		orderBy: {
			id: "desc",
		},
		include: {
			user: true,
			comments: true,
			likes: true,
		},
	});

	res.json(posts);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	const post = await prisma.post.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			user: true,
			comments: {
                include: {
                    user: true,
                }
            },
			likes: true,
		},
	});

	res.json(post);
});

module.exports = { postRouter: router };
