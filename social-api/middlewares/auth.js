const express = require("express");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

async function auth(req, res, next) {
	const authorization = req.headers.authorization;
	const token = authorization?.split(" ")[1];

	if (token) {
		const decoded = jwt.decode(token, process.env.JWT_SECRET);
		if (decoded) {
			const user = await prisma.user.findFirst({
				where: { id: decoded.id },
			});

			req.user = user;

			next();
		} else {
			res.status(401).json({ msg: "invalid token" });
		}
	} else {
		res.status(401).json({ msg: "authorization tokin missing" });
	}
}

module.exports = { auth };
