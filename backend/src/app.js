const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const apiV1 = require('./routes/apiV1');
const connectDB = require('./config/db');

const helmet = require('helmet');

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', apiV1);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

module.exports = app;
