"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const organizationsController_1 = require("../controllers/organizationsController");
const router = express_1.default.Router();
// import express from 'express';
/* GET home page. */
// router.get('/', function(req: any, res: any, next: any) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', organizationsController_1.getOrganizations);
router.get('/:id', organizationsController_1.getOrganization);
router.post('/', organizationsController_1.createOrganization);
router.put('/:id', organizationsController_1.updateOrganization);
router.delete('/', organizationsController_1.deleteOrganizations);
router.delete('/:id', organizationsController_1.deleteOrganization);
router.get('/*', organizationsController_1.getPageNotFound);
module.exports = router;
// export default router
