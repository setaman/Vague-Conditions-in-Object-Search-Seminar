const chalk = require('chalk');

const log = {
    info: (actor, text) => {
        console.info(
            chalk.blue(`[ ${chalk.blue.underline.bold(actor.toUpperCase())} ]: `)
            + chalk.cyan(`  ${normalizeText(text)}`)
        )
    },
    warn: (actor, text) => {
        console.warn(
            chalk.yellow(`! ${chalk.yellow.underline.bold(actor.toUpperCase())} !: `)
            + chalk.yellowBright(`  ${normalizeText(text)}`)
        )
    },
    error: (actor, text) => {
        console.error(
            chalk.red(`\n!!! ${chalk.red.underline.bold(actor.toUpperCase())} !!!: `)
            + chalk.redBright(`  ${normalizeText(text)} \n`)
        )
    },
};

function normalizeText(text = '') {
    let temp_text = text;
    if (typeof text === 'object') {
        try {
            temp_text = JSON.stringify(text);
        } catch (e) {
            temp_text = '';
            log,error('logger', 'Can not stringify text')
        }
    }
    return temp_text;
}

module.exports = log;