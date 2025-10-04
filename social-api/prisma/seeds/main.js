const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

async function main() {
	console.log("User seeding started...");
	for (let i = 0; i < 5; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const fullName = `${firstName} ${lastName}`;

		await prisma.user.create({
			data: {
				name: fullName,
				username: firstName + lastName[0],
				bio: faker.person.bio(),
				password: await bcrypt.hash("password", 10),
			},
		});
	}

	console.log("User seeding done.");

    console.log("Post seeding started...");
    for(let i=0; i<20; i++) {
        await prisma.post.create({
            data: {
                content: faker.lorem.paragraph(),
                userId: faker.number.int({ min: 1, max: 5 }),
            }
        });
    }

    console.log("Post seeding done.");

    console.log("Comment seeding started...");
    for (let i = 0; i < 40; i++) {
		await prisma.comment.create({
			data: {
				content: faker.lorem.paragraph(),
                postId: faker.number.int({ min: 1, max: 20 }),
				userId: faker.number.int({ min: 1, max: 5 }),
			},
		});
	}

    console.log("Comment seeding done.");
}

main();
