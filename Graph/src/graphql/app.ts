import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { createSchema, contextMiddleware, disposeScopedContainer } from './helpers';

(async () => {
    await createConnection();

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
