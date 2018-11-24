const chalk = require('chalk');

const log = {
    info: (actor, text) => {
        console.info(
            chalk.blue(`[ ${chalk.blue.underline.bold(actor.toUpperCase())} ]: `)
            + chalk.cyan(`  ${text}`)
        )
    },
    warn: (actor, text) => {
        console.warn(
            chalk.yellow(`! ${chalk.yellow.underline.bold(actor.toUpperCase())} !: `)
            + chalk.yellowBright(`  ${text}`)
        )
    },
    error: (actor, text) => {
        console.error(
            chalk.red(`\n!!! ${chalk.red.underline.bold(actor.toUpperCase())} !!!: `)
            + chalk.redBright(`  ${text} \n`)
        )
    },
};

module.exports = log;