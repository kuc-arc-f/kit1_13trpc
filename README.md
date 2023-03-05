# kit1_13trpc

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2023/03/02 

 update  : 2023/03/05
 
***
### Summary

tRPC/Server + SvelteKit, Sample

***
### Setup

```
npm install
```

***
* server/.env : postgres set

```
POSTGRES_DATABASE="chat"
POSTGRES_USER=""
POSTGRES_PASSWORD=""
POSTGRES_HOST=""
POSTGRES_PORT=5432

```

***
* client/.env
```
PUBLIC_TRPC_URL = "http://localhost:3000/trpc"
```
***
### Start server
* start :

```
# server
yarn dev

# client
yarn dev

```
***
### build

```
#server 

cd server

yarn build

yarn start

```
***

* open: http://localhost:5173/

***
### Blog:


***