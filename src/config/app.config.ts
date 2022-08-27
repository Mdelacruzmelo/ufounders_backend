export const EnvConfiguration = () => ({

    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB_DATABASE,
    connection: process.env.MONGODB_CONNECTION_STRING,
    connectionLocal: process.env.MONGODB_CONNECTION_STRING_LOCAL,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT || 8000,
    defaultLimit: process.env.DEFAULT_LIMIT || 30

})