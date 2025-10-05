const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth.js");

router.get("/verify", auth, (req, res) => {
    res.json(req.user);
});

router.get("/", auth, async (req, res) => {
	const users = await prisma.user.findMany({
		orderBy: { id: "desc" },
		take: 20,
	});

	res.json(users);
});

router.post("/", async (req, res) => {
	const name = req.body?.name;
	const username = req.body?.username;
	const bio = req.body?.bio;
	const password = req.body?.password;

	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "required: name, username, password" });
	}

	const user = await prisma.user.create({
		data: {
			name: name,
			username: username,
			bio: bio,
			password: await bcrypt.hash(password, 10),
		},
	});

	res.status(201).json(user);
});

router.post("/login", async (req, res) => {
	const username = req.body?.username;
	const password = req.body?.password;

	if (!username || !password) {
		return res.status(400).json({ msg: "required: username and password" });
	}

	const user = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});

	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			return res.json({
				user: user,
				token: jwt.sign(
					{ id: user.id, username: user.username },
					process.env.JWT_SECRET
				),
			});
		}
	}

    res.status(401).json({ msg: 'incorrect username or password' });
});

module.exports = { userRouter: router };
