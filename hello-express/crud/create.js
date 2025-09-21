const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: "alice",
        username: "alice",
    }
}).then(data => {
    console.log(data);
});

async function create() {
    const data = await prisma.user.create({
        data: {
            name: "Bob",
            username: "bob",
            posts: {
                create: [
                    { content: "A new post" },
                    { content: "Another post content" },
                ]
            }
        }
    });

    console.log(data);
}

create();
