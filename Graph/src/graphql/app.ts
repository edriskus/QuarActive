import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { createSchema, contextMiddleware, disposeScopedContainer } from './helpers';

(async () => {
    const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/quaractive';
    await createConnection({
        type: "postgres",
        url,
        entities: ["./src/entities/*.ts"],
        synchronize: true
    });

    const schema = await createSchema();
    const server = new ApolloServer({
        schema,
        debug: false,
        introspection: true,
        playground: true,
        context: contextMiddleware,
        plugins: [disposeScopedContainer],
    });

    const port = process.env.PORT || 4000;
    server.listen({ port }, () =>
        console.log(
            `Server ready at http://localhost:${port}${server.graphqlPath}`
        )
    );
})();
