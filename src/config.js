module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: '',
    DB_URL: process.env.DB_URL || 'postgresql://becki_pg:password@localhost/activitiesassistant',
}