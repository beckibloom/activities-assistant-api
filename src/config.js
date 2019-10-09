module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: '',
    DB_URL: process.env.DB_URL || 'postgresql://becki_pg:password@localhost/activitiesassistant',
    JWT_SECRET: process.env.JWT_SECRET || 'AsMarcelProustWouldSay',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '20s',
}