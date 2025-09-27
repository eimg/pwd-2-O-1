const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function read() {
    const users = await prisma.user.findMany({
        include: { posts: true }
    });

    console.log(users);
}

read();
