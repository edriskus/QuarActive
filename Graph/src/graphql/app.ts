import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { createSchema, contextMiddleware, disposeScopedContainer } from './helpers';

(async () => {
    console.log(process.env.DATABASE_URL);
    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: ["./src/entities/*.ts"]
    });

    const schema = await createSchema();
    const server = new ApolloServer({
        schema,
        debug: false,
        context: contextMiddleware,
        plugins: [disposeScopedContainer],
    });

    server.listen({ port: 4000 }, () =>
        console.log(
            `Server ready at http://localhost:4000${server.graphqlPath}`
        )
    );
})();
