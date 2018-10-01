const logger = require('../tools/logger');

function getEntity(text, regex) {
    const match = text.toLowerCase().match(regex);
    return match || [];
}

function getEntities(text) {
    const entities = {
        iceCream: [],
        hello: [],
        goodBye: [],
    };

    entities.iceCream.push(...getEntity(text, /strawberry|chocolate|vanilla|lemon|ice cream|sorbet/g));
    entities.hello.push(...getEntity(text, /(hello|hi|hey) |good (morning|evening|afternoon)/g));
    entities.goodBye.push(...getEntity(text, /cya|good (bye|night)/g));

    return entities;
}

function getIntent(text, entities) {
    let intent = 'fallback';
    const score = {
        iceCream: entities.iceCream.length,
        hello: entities.hello.length,
        goodBye: entities.goodBye.length,
    };

    logger.info(JSON.stringify(score, null, 2));

    // if entity score is > 0 and every other entity score is = 0
    // we select the intent matching the entity
    for (const entity in entities) {
        const entityScore = score[entity];
        if (entityScore > 0) {
            if (Object.values(score).reduce((a, b) => a + b) === entityScore) {
                intent = entity;
                return intent;
            }
        }
    }
    // else, we select the intent with the most entities matched, or 'iceCream' in case of equality
    const entries = Object.entries(score);
    entries.sort(([k1, v1], [k2, v2]) => v2 - v1 || k2 === 'iceCream' - k1 === 'iceCream');
    logger.info(JSON.stringify(entries));
    const [bestEntity] = entries;
    const [key, value] = bestEntity;
    if (value > 0){
        return key;
    }
    return intent;
}

function nluService(req, res) {
    const { text } = req.body;
    const entities = getEntities(text);
    const intent = getIntent(text, entities);
    const result = { intent, entities };
    logger.info(JSON.stringify(result, null, 2));
    res.json(result);
}

module.exports = {
    nluService,
};
