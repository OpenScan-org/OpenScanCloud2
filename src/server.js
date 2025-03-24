import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import routes from './routes/index.js';
import sequelize from './config/database.js';

// Import models to ensure they're loaded
import User from './models/user.model.js';
import Job from './models/job.model.js';
import Worker from './models/worker.model.js';
import ApiKey from './models/apiKey.model.js';

const app = express();
const basePath = process.env.BASE_PATH || "";

// Setup model associations
const models = {
    User,
    Job,
    Worker,
    ApiKey
};

Object.values(models).forEach(model => {
    if (model.setupAssociations) {
        model.setupAssociations(models);
    }
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected & tables synced');
    })
    .catch(err => console.error('Database sync error:', err));

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API-Routen einbinden with correct base path
app.use(`${basePath}/api/v1`, routes);

// Swagger-UI für API-Dokumentation with correct base path
app.use(`${basePath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add a simple health check route
app.get(`${basePath}/health`, (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Debug route to see all registered routes
app.get(`${basePath}/routes`, (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push({
                path: middleware.route.path,
                methods: Object.keys(middleware.route.methods)
            });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        path: handler.route.path,
                        methods: Object.keys(handler.route.methods)
                    });
                }
            });
        }
    });
    res.json(routes);
});

export default app;
