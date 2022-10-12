const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3333;

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

require("./routes/student.route")(app);

app.get("/", (req, res) =>{
    res.json({ message: `Welcome to student datails.`});
});

app.listen(PORT, () => {
    console.log(`Server Running at PORT: ${PORT}`);
});