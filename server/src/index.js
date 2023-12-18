const express = require("express");
const cors = require("cors");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();
const morgan = require("morgan");
const path = require("path");

app.use(cors());
app.use(express.json()); // for parsing application/json from request body

// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); //use morgan to log requests to the console
app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});


app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
