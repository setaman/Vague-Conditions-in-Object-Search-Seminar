const credentials = require('../creds');
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(credentials.neo4j_user, credentials.neo4j_pass));
const session = driver.session();

module.exports.getTest = (req, res) => {
    session
        .run('MATCH(n) RETURN n')
        .then(result => {
            res.status(200).type('application/json').send(result.records);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err});
        })
        .finally(()=>session.close())
};