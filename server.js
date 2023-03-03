const express = require('express');
const errHandler = require('./middlewares/errHandler');
const cors = require('cors');
const router = require('./routes');
const env = require('./configs/env');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const port = env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./logs/requests.log', { flags: 'a' }),
  })
);
app.use(morgan('dev'));
app.use(router);
app.use(errHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
