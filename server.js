const connectDB = require("./config/db");

const app = require("./app");

const PORT = process.env.PORT || 5000;

//  connect to the DB
connectDB();

app.listen(PORT, () => console.log("server running at ", PORT));
