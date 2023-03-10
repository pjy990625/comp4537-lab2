const express = require("express");
const cors = require("cors");
const fetch = require('node-fetch');

const app = express();
app.use(express.json()); // read JSON body
app.use(express.urlencoded({ extended: true })); // read URL-encoded body
app.use(cors());

const PORT = 3000;

app.post("/chatbot", (req, res) => {
    const message = req.body.message;
    const number = String(message).match(/\d+/);

    if (number) {
        fetch(`http://numbersapi.com/${number}?type=trivia`)
            .then((response) => response.text())
            .then((data) => {
                res.json({
                    text: data,
                });
            })
            .catch((error) => {
                res.json({
                    text: "Sorry, I couldn't find any information about that number.",
                });
            });
    } else {
        res.json({
            text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
