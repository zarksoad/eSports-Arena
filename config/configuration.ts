const defaultPort: string = '5432';

export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? defaultPort, 10) || 5432,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
