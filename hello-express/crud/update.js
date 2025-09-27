const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function update() {
    const user = await prisma.user.update({
        where: { id: 1 },
        data: {
            name: "Alice Rhyes",
            bio: "like to read and travel",
        }
    });

    console.log(user);
}

update();
