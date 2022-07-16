const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const productService = require('../src/services/product');
const productModel = require('../src/models/product');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Product test suite.
 */
describe('product ', () => {

    it('can be created correctly', async () => {
        expect(
            async () =>{ 
            await productService.create(productComplete)
            console.log('==========================check>', 1)
            process.env['id'] = 1;
            })
            .not
            .toThrow();
    });

    it('can not be created correctly', async () => {
        expect(async () => {
        await productService.create(productComplete)
        console.log("==================>>>>>>>second", process.env.id)
        })
            .not
            .toThrow();
    });
});

/**
 * Complete product example.
 */
const productComplete = {
    name: 'iPhone 11',
    price: 699,
    description: 'A new dual‑camera system captures more of what you see and love. '
};

const productInvalidComplete = {
    name: 'iPhone 11',
    price: "abc",
    description: 'A new dual‑camera system captures more of what you see and love. '
};