// const express = require('express');
import express from 'express';
import { getOrganizations, getOrganization, createOrganization, updateOrganization, deleteOrganization, deleteOrganizations, getPageNotFound } from '../controllers/organizationsController'
const router = express.Router();

// import express from 'express';

/* GET home page. */
// router.get('/', function(req: any, res: any, next: any) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', getOrganizations);
router.get('/:id', getOrganization);
router.post('/', createOrganization);
router.put('/:id', updateOrganization);
router.delete('/', deleteOrganizations);
router.delete('/:id', deleteOrganization);
router.get('/*', getPageNotFound);

module.exports = router;

// export default router
