const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
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
        }
    });

    res.status(201).json(user);
});

module.exports = { userRouter: router };
