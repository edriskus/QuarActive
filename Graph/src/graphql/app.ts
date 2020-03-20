import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { createSchema, contextMiddleware, disposeScopedContainer } from './helpers';

// TYPEORM_CONNECTION = postgres
// TYPEORM_HOST = localhost
// TYPEORM_USERNAME = postgres
// TYPEORM_PASSWORD = postgres
// TYPEORM_DATABASE = quaractive
// TYPEORM_PORT = 5432

(async () => {
    const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/quaractive';
    console.log(url);
    await createConnection({
        type: "postgres",
        url,
        entities: ["./src/entities/*.ts"]
    });

    const schema = await createSchema();
    const server = new ApolloServer({
        schema,
        debug: false,
        context: contextMiddleware,
        plugins: [disposeScopedContainer],
    });

    const port = process.env.PORT || 4000;
    server.listen({ port }, () =>
        console.log(
            `Server ready at http://localhost:4000${server.graphqlPath}`
        )
    );
})();
