const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.get('/items', async (req, res) => {
    const items = await prisma.todo.findMany();

    res.json(items);
});

app.get('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await prisma.todo.findFirst({
        where: {
            id: Number(id),
        }
    });

    res.json(item);
});

app.post('/items', async (req, res) => {
    const name = req.body?.name;
    if(!name) {
        return res.status(400).json({msg: 'name required'});
    }

    const item = await prisma.todo.create({
        data: {
            name: name
        },
    });

    res.status(201).json(item);
});

app.put("/items/:id/toggle", async (req, res) => {
    const id = req.params.id;
    const currentItem = await prisma.todo.findFirst({
        where: { id: Number(id) }
    });

    if(currentItem) {
        const updateItem = await prisma.todo.update({
            where: { id: Number(id) },
            data: {
                done: !currentItem.done,
            },
        });

        return res.json(updateItem);
    }

    res.status(404).json({ msg: 'Item not found' });
});

app.delete("/items/:id", async (req, res) => {
    const id = req.params.id;
    const item = await prisma.todo.delete({
        where: { id: Number(id) },
    });

    res.json(item);
});

app.listen(8800, () => {
    console.log("Hello Express running at 8800...");
});
