const http = require('http')
const app = require('./app')

const db = require("./models");
const dbConfig = require("./config/db.config");

// DB Connection
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const server = http.createServer(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port ${PORT}.`);
    }
});

// Role Initialization
const Role = db.role;
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'student' to roles collection");
      });

      new Role({
        name: "instructor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'instructor' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}