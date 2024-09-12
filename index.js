const express = require('express');
const app = express();
const dbConnection = require('./database/db.connection');
app.use(express.json());


// Route-0 for default endpoint
app.get('/', (req,res)=> {
    res.send("Hello from the Nodejs server");
});

app.use("/api/v1/", require('./routes/user'));
app.use("/api/v1/", require("./routes/product"));

// Custom 404 Error Handler
app.all('*', (req, res) => {
    res.status(404).json({ message: "Endpoint, not found !" });
})

// dbConnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server started at ${PORT}`);
})
