import app  from '../src/app';
// const app = require('../src/app');
// const request = require('supertest');
import request from 'supertest';
import { constants } from 'buffer';

describe('Test Get requests' , () => {
    // it('Should return status 404 if no database found' , async() => {
    //     const res = await request(app).get('/')
    //     expect(res.statusCode).toEqual(404)
    // })
    test('Should get all companies and return status 200' , async() => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
    })
    test('Should get company with valid id and return status 200', async() => {
        const companyId = 1
        const res = await request(app).get(`/${companyId}`)
        expect(res.statusCode).toEqual(200)
    })
    test('Should return status 404 for invalid id passed', async() => {
        const invalidId = 'wrong id'
        const res = await request(app).get(`/${invalidId}`)
        expect(res.statusCode).toEqual(404)
    })
})

describe('Test Post requests' , () => {
    test('Should return 201 on succesful posting', async() => {
        const detailsObj = {
            "organization": "SAMPLE TechCorp",
            "products": [
             "Programmer",
             "Ronaldo"
            ],
            "marketValue": "60%",
            "address": "Anambra",
            "ceo": "bn",
            "country": "Nigeria",
            "noOfEmployees": 3,
            "employees": [
             "james bond",
             "chan",
             "bruce lee"
            ] }
        const res = await request(app).post('/').send(detailsObj)
        expect(res.statusCode).toEqual(201)
    })
})

describe('Test Put requests' , () => {
    test('Should return 201 on succesful update', async() => {
        const companyId = 1
        const detailsObj = {
            "organization": "SAMPLE TechCorp",
            "products": [
             "Programmer",
             "Ronaldo"
            ],
            "marketValue": "60%",
            "address": "Anambra",
            "ceo": "bn",
            "country": "Nigeria",
            "noOfEmployees": 3,
            "employees": [
             "james bond",
             "chan",
             "bruce lee"
            ] }
        const res = await request(app).put(`/${companyId}`).send(detailsObj)
        expect(res.statusCode).toEqual(201)
    })
    test('Should return 404 for a wrong id', async() => {
        const invalidId = 'wrong id'
        const detailsObj = {
            "organization": "SAMPLE TechCorp",
            "products": [
             "Programmer",
             "Ronaldo"
            ],
            "marketValue": "60%",
            "address": "Anambra",
            "ceo": "bn",
            "country": "Nigeria",
            "noOfEmployees": 3,
            "employees": [
             "james bond",
             "chan",
             "bruce lee"
            ] }
        const res = await request(app).put(`/${invalidId}`).send(detailsObj)
        expect(res.statusCode).toEqual(404)
    })
})

describe('Test Delete requests' , () => {
    test('Should return status 200 for succesfully delete valid id' , async() => {
        const companyId = 1
        const res = await request(app).delete(`/${companyId}`)
        expect(res.statusCode).toEqual(200)
    })
    test('Should return status 404 for invalid id passed' , async() => {
        const companyId = '1'
        const res = await request(app).delete(`/${companyId}`)
        expect(res.statusCode).toEqual(404)
    })
    test('Should return status 200 for succesfully deleting all database contents' , async() => {
        const res = await request(app).delete('/')
        expect(res.statusCode).toEqual(200)
    })
})