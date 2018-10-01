const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('./tools/logger');
const { nluService } = require('./service/nlu');

const port = 8081;
const server = 'BBL NLU';

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/nlu', (req, res) => {
    logger.info('Nlu has been called !');
    nluService(req, res);
});

app.listen(port, () => {
    logger.info(`Starting "${server}" listening on port ${port}`);
});
