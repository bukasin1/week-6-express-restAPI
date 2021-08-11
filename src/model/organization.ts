const fs = require('fs')

interface dataObj {
    [key: string] : string | number | string[] | Date
    // [email: string]: string | number | string[]
}
type obj  = {
  [email: string]: string | number | string[]
}

let organizationsModel: dataObj[];

try{
    organizationsModel = require('../../databases/testdb.json')
}catch(err){
    console.log(err)
}

function getAll(){
    return new Promise((resolve, reject) => {
        resolve(organizationsModel)
    })
}

function getById(id: number){
    let organization: dataObj | undefined
    return new Promise((resolve, reject) => {
        if(organizationsModel){
            organization = organizationsModel.find((organization: dataObj) => organization['id'] === id)
            organization
            resolve(organization)
        }else{
            resolve(organization)
            console.log(organization)
        }
    })
}

function create(organization: dataObj){
    return new Promise((resolve, reject) => {
        const date = new Date()
        let newOrgan: dataObj
        if(!organizationsModel || organizationsModel.length < 1){
            const id = 1;
            newOrgan = {id: id, createdAt: date, ...organization}
            organizationsModel = [newOrgan]
        }else{
            const lastIndex = organizationsModel.length - 1
            const id = organizationsModel[lastIndex].id as number + 1
            newOrgan = {id: id, createdAt: date, ...organization}
            organizationsModel.push(newOrgan)
        }
        const writeStream = fs.createWriteStream('./databases/testdb.json')
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end()
        resolve(newOrgan);
    })
}

function update(id: number, newOrganDetails: dataObj){
    return new Promise((resolve, reject) => {
        const date = new Date()
        let newOrgan
        const index = organizationsModel.findIndex((organization: dataObj) => organization['id'] === id)
        const createdDate = organizationsModel[index].createdAt
        organizationsModel[index] = {id: id, createdAt: createdDate, updatedAt: date, ...newOrganDetails}
        const writeStream = fs.createWriteStream('./databases/testdb.json')
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end()
        resolve(organizationsModel[index]);
    })
}

function deleteById(id: number){
    return new Promise((resolve, reject) => {
        organizationsModel = organizationsModel.filter((o: dataObj) => o['id'] !== id)
        const writeStream = fs.createWriteStream('./databases/testdb.json')
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end()
        resolve(null);
    })
}

function deleteAll(){
    return new Promise((resolve, reject) => {
        organizationsModel = []
        const writeStream = fs.createWriteStream('./databases/testdb.json')
        writeStream.write(JSON.stringify(organizationsModel, null, 4));
        writeStream.end()
        resolve(null);
    })
}

// async function test(){
//     console.log(await getById(1))
//     console.log(await getAll())
// }

// test()

export {getAll, getById, create, update, deleteById, deleteAll}