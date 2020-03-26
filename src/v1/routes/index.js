import express from 'express';
import swaggerDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from '../utils';

const router = express();
const options = {
  swaggerDefinition,
  apis: ['**/docs/*.yml'],
};

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc(options)));

router.get('/swagger.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDoc(options));
});

router.get('/', (_req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Welcome',
  }),
);

export default router;
