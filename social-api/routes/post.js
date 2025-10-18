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

router.post("/", auth, async (req, res) => {
	const content = req.body?.content;

    if (!content) {
        return res.status(400).json({ msg: "content is required" });
    }

	try {
		const post = await prisma.post.create({
			data: {
				content,
				userId: req.user.id,
			},
		});

		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

router.delete("/:id", auth, async (req, res) => {
	const id = req.params.id;

	const post = await prisma.post.delete({
		where: {
			id: Number(id),
		},
	});

	res.json(post);
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
				},
			},
			likes: true,
		},
	});

	res.json(post);
});

// Like a post
router.post("/:id/like", auth, async (req, res) => {
	const postId = Number(req.params.id);
	const userId = req.user.id;

	try {
		// Check if like already exists
		const existingLike = await prisma.like.findFirst({
			where: {
				postId,
				userId,
			},
		});

		if (existingLike) {
			return res.status(400).json({ msg: "Post already liked" });
		}

		// Create new like
		const like = await prisma.like.create({
			data: {
				postId,
				userId,
			},
			include: {
				post: true,
				user: true,
			},
		});

		res.status(201).json(like);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

// Unlike a post
router.delete("/:id/like", auth, async (req, res) => {
	const postId = Number(req.params.id);
	const userId = req.user.id;

	try {
		// Check if like exists
		const existingLike = await prisma.like.findFirst({
			where: {
				postId,
				userId,
			},
		});

		if (!existingLike) {
			return res.status(404).json({ msg: "Like not found" });
		}

		// Delete the like
		const like = await prisma.like.delete({
			where: {
				id: existingLike.id,
			},
		});

		res.json(like);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

module.exports = { postRouter: router };
