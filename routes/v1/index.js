const express = require('express');
const authRoute = require('./auth.route');
const checklistRoute = require('./checklist.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/checklist',
        route: checklistRoute,
    }
]


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

module.exports = router