// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/index';
import { PUBLIC_TRPC_URL } from '$env/static/public'

// Notice the <AppRouter> generic here.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: PUBLIC_TRPC_URL,
    }),
  ],
});
// url: 'http://localhost:3000/trpc',
