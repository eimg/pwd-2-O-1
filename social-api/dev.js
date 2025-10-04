const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = { name: 'Alice', age: 22 };
const secret = "some secret code";

function createToken() {
    const token = jwt.sign(user, secret);
    console.log(token);
}

function decodeToken() {
    const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJhZ2UiOjIyLCJpYXQiOjE3NTk1NDYzMTl9.71oCKqa0_IYRfYwPiZzVYf3Cb8nJ8AGzl3sP5j_-jdg";
    console.log(jwt.decode(token, secret));
}

createToken();
decodeToken();

// async function main() {
//     const password = "apple";
// 	const hash = await bcrypt.hash(password, 10);

//     console.log(hash);
// }

// main();
