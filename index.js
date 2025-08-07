
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { refreshTokenRoutes } = require('./middleware/tokenValidation');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Welcome');
});

refreshTokenRoutes(app);

app.use('/api', routes);
app.use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`);
    console.log(`Swagger is Running at http://localhost:${PORT}/api-docs`);
});