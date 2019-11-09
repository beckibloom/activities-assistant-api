module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: '',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://becki_pg:password@localhost/activitiesassistant',
    JWT_SECRET: process.env.JWT_SECRET || 'AsMarcelProustWouldSay',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1800s',
}