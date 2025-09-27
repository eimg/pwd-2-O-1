const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function remove() {
    const posts = await prisma.post.deleteMany({
        where: { userId: 1 },
    });  

    console.log(posts);
}

remove();
