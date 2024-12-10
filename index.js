const express = require("express");
const cors = require("cors"); 
const connection = require("./config/connectionDb");
const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/car", require("./route/carRoute"));
app.use('/locations',require("./route/locationRoute"))


connection();

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
