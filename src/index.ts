require('dotenv').config();
import { bootstrap } from '@vendure/core';
import { config } from './vendure-config';

const server = bootstrap(config);
server.then(() => {
    console.log(`\x1b[46mUsing database ${process.env.DATABASE_NAME} \x1b[0m`);
})
    .catch(err => {
        // tslint:disable-next-line:no-console
        console.log(err);
    });