const request = require('supertest');
const router = require('../../server');
const {
    clearTestTable
} = require('../prisons/prisonsModel');

describe('Auth', () => {
    describe('/register', () => {
        afterEach(async () => {
            await clearTestTable();
        });

        describe('General expectations', () => {
            it("should return JSON", async () => {
                const resp = await request(router).post('/api/auth/register').send({
                    location: 'FCI Florence',
                    population: 1377,
                    password: '123456abcdef',
                    zipcode: 81226
                });

                expect(resp.type).toBe('application/json')
            });
        });

        describe('password hashing', () => {
            it('should not store the original password', async () => {
                const resp = await request(router).post('/api/auth/register').send({
                    location: 'FCI Florence',
                    population: 1377,
                    password: '123456abcdef',
                    zipcode: 81226
                });

                expect(resp.body.password).not.toBe('123456abcdef');
            });
        });
        describe('success', () => {
            it('should return 201 status code', async () => {
                const resp = await request(router).post('/api/auth/register').send({
                    location: 'FCI Florence',
                    population: 1377,
                    password: '123456abcdef',
                    zipcode: 81226
                });

                expect(resp.status).toBe(201);
            });

            it('should return prisons info', async () => {
                const resp = await request(router).post('/api/auth/register').send({
                    location: 'FCI Florence',
                    population: 1377,
                    password: '123456abcdef',
                    zipcode: 81226
                });

                expect(resp.body.id).toBe(1);
                expect(resp.body.location).toBe('FCI Florence');
                expect(resp.body.population).toBe(1377);
                expect(resp.body.zipcode).toBe(81226)
            });
        });
    });
});