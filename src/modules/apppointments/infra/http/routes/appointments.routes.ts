import { Router } from 'express';

import auth from '@modules/users/infra/http/middlewares/auth';

import AppointmentController from '../controllers/AppointementController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(auth);

// appointmentsRouter.get('/', async (request, response) => {
//   const appoinments = await appoinmentsRepository.find();

//   return response.json(appoinments);
// });

appointmentsRouter.post('/create', appointmentsController.create);

export default appointmentsRouter;
