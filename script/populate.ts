require('dotenv').config({ path: process.env.SHOP_ENV });
import {bootstrap} from '@vendure/core';
import {populate} from '@vendure/core/cli';
import {config} from '../src/vendure-config';
import {initialData} from './initial-data';
import * as path from 'path';

const productsCsvFile = path.join(__dirname, './products.csv')

populate(
    () => bootstrap(config),
    initialData,
    productsCsvFile,
)
    .then(app => {
        return app.close();
    })
    .then(
        () => process.exit(0),
        err => {
            console.log(err);
            process.exit(1);
        },
    );
