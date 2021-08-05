# week-6-task-node08
# EXPRESS 

### Setup
1. Your are required to use TypeScript for the task
2. Use and setup the project with `Yarn`

## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) into a file database.json, document and publish your endpoints using postman.

## How will I complete this project?
- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically).
  - `PUT` Request which updates fields of a particular data using the id in database.json
  - `DELETE` Request which removes a particular data from your database.json using the id
- Host your application on Heroku
- Data format example:

```
[
    {
    organization: "node ninja",
    createdAt: "2020-08-12T19:04:55.455Z",
    updatedAt: "2020-08-12T19:04:55.455Z",
    products: ["developers","pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    id: 2,
    noOfEmployees:2,
    employees:["james bond","jackie chan"]
    }
]
```
## Test coverage
- Make sure you write test to cover your application using supertest

### Test
- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes
