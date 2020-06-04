const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const cors = require("cors")

const authRouter = require('./routes/auth.routes')
const usersRouter = require('./routes/user.route')
const coursesRouter = require('./routes/course.routes')
const lessonsRouter = require('./routes/lesson.routes')
const rolesRouter = require('./routes/role.routes')

const swaggerDocument = require('./swagger.json');

const corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();

// Adding logger
app.use(logger('dev'))

// Adding Cors
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Allowing headers
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/lessons', lessonsRouter)
app.use('/api/v1/courses', coursesRouter)
app.use('/api/v1/roles', rolesRouter)

// simple route
app.get("/api/v1/", (req, res) => {
  res.json({
    message: "Welcome to Online Learning Portal."
  });
});

module.exports = app