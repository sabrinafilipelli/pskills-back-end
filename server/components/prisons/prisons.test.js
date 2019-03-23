const request = require('supertest');
const server = require('./index');
const bcrypt = require('bcryptjs');

const {
    clearTestTable,
    create,
    readAll,
    readOne
} = require('./prisonsModel');

describe('Prisons', () => {
    describe('Model', () => {
        describe('READ', () => {
            beforeEach(async () => {
                const hash = await bcrypt.hashSync('abcdef12345', 14);

                await create({
                    location: 'FCI Florence',
                    population: 1377,
                    password: hash,
                    zipcode: 81226
                });

                await create({
                    location: 'FCI Englewood',
                    population: 1073,
                    password: hash,
                    zipcode: 80123
                })
            });

            afterEach(async () => {
                await clearTestTable();
            });


            describe('READ ALL', () => {
                it('should be defined', () => {
                    expect(readAll).toBeDefined();
                });

                it('should return the correct number of records', async () => {
                    const prisons = await readAll();

                    expect(prisons).toHaveLength(2)
                });
            });

            describe('READ ONE', () => {
                it('should be defined', () => {
                    expect(readOne).toBeDefined();
                });

                it('should return the correct prison', async () => {
                    let prison = await readOne(1);

                    expect(prison.location).toBe('FCI Florence');

                    prison = await readOne(2);

                    expect(prison.location).toBe('FCI Englewood');
                });
            });
        });

        describe('UPDATE', () => {
            
        });

        describe('DESTROY', () => {
            
        });
    });

    describe('Router', () => {
        
    });
});