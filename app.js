require('dotenv').config();
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./src/routes"); 

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swaggerConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
