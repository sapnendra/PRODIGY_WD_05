import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "248f55de320989adcdd6ce6335f4490f";
const baseUrl = "https://api.openweathermap.org/data/3.0";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        content: null,
        error: null,
    });
});

app.post("/", (req, res) => {
    try {
        let city = req.body["city"];
        console.log(city);
        const url = `${baseUrl}/onecall?q=${city}&units=imperial&appid=${apiKey}`;
        const response = axios.get(url);
        res.render("index.ejs", {
            content: JSON.parse(response.data.main.temp),
            error: null
        });
    } catch(error) {
        res.render("index.ejs", {
            content: null,
            error: "404 No Found"
        });
        res.status(404);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});