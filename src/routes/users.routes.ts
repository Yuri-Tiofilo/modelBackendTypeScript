import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  return res.json({ ok: true });
});

usersRouter.post('/createUser', (req, res) => {
  return res.json({ ok: true });
});

export default usersRouter;
