import {Request, Response} from 'express';
const Organizations = require('../model/organization')

// console.log(Organizations.getAll())

async function getOrganizations(req: Request, res: Response) {
    try{
        const organizations = await Organizations.getAll()
        if(organizations === undefined || organizations.length < 1){
            res.status(404).end('No database entry made yet, kindly make a post first');
            // res.end('No database entry made yet, kindly make a post first');
        }else{
            // res.status(200).end(JSON.stringify(organizations, null, 4));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(organizations));
        }
    }catch (err) {
        console.log(err)
    }
}

async function getOrganization(req: Request, res: Response) {
    try{
        const organizations = await Organizations.getAll()
        const organization = await Organizations.getById(+req.params.id)
        if(organizations === undefined){
            res.status(404).end('No database entry made yet, kindly make a post first');
            // res.end('No database entry made yet, kindly make a post first');
        }else{
            if(!organization){
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Organization Not Found' }))
            }else{
                // res.status(200).end(JSON.stringify(organizations, null, 4));
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(organization))
            }
        }
    }catch (err) {
        console.log(err)
    }
}

async function createOrganization(req: Request, res: Response){
    try{
        const {organization, products, marketValue, address, ceo, country, employees} = req.body
        const organDetails = {
        organization,
        products: products || [],
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees: employees.length || 0,
        employees: employees || []
        }
        const newOrgan = await Organizations.create(organDetails);
        // res.status(201).end(JSON.stringify(organizations, null, 4));
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newOrgan));
    }catch (err) {
        console.log(err)
    }
}

async function updateOrganization(req: Request, res: Response){
    try{
        const organizations = await Organizations.getAll()
        const organiztion = await Organizations.getById(+req.params.id)
        if(organizations === undefined){
            res.end('No database entry made yet, kindly make a post first');
        }else{
            if(!organiztion){
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Organization Not Found' }))
            }else{
                const {organization, products, marketValue, address, ceo, country, employees} = req.body;
                let newProducts;
                let newEmployees;
                if(products){
                    organiztion.products.push(...products)
                    newProducts = organiztion.products
                }else newProducts = organiztion.products
                if(employees){
                    organiztion.employees.push(...employees)
                    newEmployees = organiztion.employees
                }else newEmployees = organiztion.employees
                const organDetails = {
                    organization: organization || organiztion.organization,
                    products: newProducts,
                    marketValue: marketValue || organiztion.marketValue,
                    address: address || organiztion.address,
                    ceo: ceo || organiztion.ceo,
                    country: country || organiztion.country,
                    noOfEmployees: newEmployees.length,
                    employees: newEmployees
                }
                const updOrgan = await Organizations.update(+req.params.id, organDetails);
                // res.status(201).end(JSON.stringify(organizations, null, 4));
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(updOrgan));
            }
        }
    }catch (err) {
        console.log(err)
    }
}

async function deleteOrganization(req: Request, res: Response){
    try{
        const organizations = await Organizations.getAll()
        const organiztion = await Organizations.getById(+req.params.id)
        if(organizations === undefined || organizations.length < 1){
            res.status(404).end('No database entry made yet, Nothing to delete');
            // res.end('No database entry made yet, Nothing to delete');
        }else{
            if(!organiztion){
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Organization Not Found' }))
            }else{
                await Organizations.deleteById(+req.params.id)
                res.status(200).end(`Organization ${+req.params.id} deleted from database`);
                // res.writeHead(200, { "Content-Type": "application/json" });
                // res.end(`Organization ${+req.params.id} deleted from database`)
            }
        } 
    }catch (err) {
        console.log(err)
    }
}

async function deleteOrganizations(req: any, res: any) {
    try{
        const organizations = await Organizations.getAll()
        if(organizations === undefined || organizations.length < 1){
            res.status(404).end('No database entry made yet, Nothing to delete');
            // res.end('No database entry made yet, kindly make a post first');
          }else{
            await Organizations.deleteAll()
            res.status(200).end('All database entries deleted');
            // res.end('All database entries deleted')
          }
    }catch (err) {
        console.log(err)
    }
}

export { getOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization, deleteOrganizations }