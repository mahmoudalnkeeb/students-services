const express = require('express');
const errHandler = require('./middlewares/errHandler');
const cors = require('cors');
const router = require('./routes');
const env = require('./configs/env');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const port = env.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: env.origins }));
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./logs/requests.log', { flags: 'a' }),
  })
);
app.use(morgan('dev'));
app.use(router);
app.use(errHandler);

app.listen(port, () => console.log(`app running on port ${port}`));
