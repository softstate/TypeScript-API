import API from '../core';
let PORTA = process.env.PORT || 3000

process.once('SIGUSR2', () => 
    API.closeDatabaseConnection('nodemon restart', () => 
        process.kill(process.pid, 'SIGUSR2')
        ));

process.on('SIGINT', () => 
    API.closeDatabaseConnection(console.log("\x1b[34m","'Stopping... Até logo :)"), () => 
        process.exit(0)
        ));

API.APP.listen(PORTA, () => console.log("\x1b[34m%s\x1b[0m",`servidor rodando: ${PORTA}`));   