const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/items', (req, res) => {
    res.json({ msg: "Hello Express: [items]" });
});

app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    res.json({ msg: `Hello Express: [items, ${id}]` });
});

app.post('/items', (req, res) => {
    const name = req.body?.name;
    if(!name) {
        return res.status(400).json({msg: 'name required'});
    }

    res.status(201).json({ msg: `Hello Express: POST [name=${name}]` });
});

app.listen(8800, () => {
    console.log("Hello Express running at 8800...");
});
