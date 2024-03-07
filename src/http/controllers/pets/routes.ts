import { FastifyInstance } from 'fastify';
import { create } from './create';
import { get } from './get';
import { searchMany } from './search-many';
import { verifyJWT } from '../middlewares/verify-jwt';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.get('/pets/:id', get)
  app.get('/pets', searchMany)
}