import express from 'express';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';

const app = express();
const PORT = 3000;
app.use(cors());

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
//type
interface User {
  id: string;
  name: string;
}
const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
];
//
const appRouter = router({
  hello: t.procedure.query(() => {
    return 'Hello World-333';
  }),
  helloName: t.procedure
    .input(z.object({ name: z.string(), age: z.number() }))
    .query(({ input }) => {
      return {
        name: `Hello World ${input.name}`,
        age: input.age,
      };
  }),  
  /**
   * userById
   * @param
   *
   * @return
   */   
  userById: publicProcedure
  .input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  })
  .query((req) => {
    const input = req.input;
    const user = userList.find((it) => it.id === input);
    return user;
  }),
  /**
   * userCreate
   * @param
   *
   * @return
   */   
  userCreate: publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation((req) => {
    const id = `${Math.random()}`;
    const user: User = {
      id,
      name: req.input.name,
    };
console.log(user);
    userList.push(user);
    return user;
  }),
  /**
   * getUserList
   * @param
   *
   * @return
   */   
  getUserList: publicProcedure.query(() => {
    return userList;
  }),      
});

app.get('/', (_req, res) => res.send('hello'));

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

export type AppRouter = typeof appRouter;
