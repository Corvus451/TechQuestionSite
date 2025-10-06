require('dotenv').config();

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    PGUSER: process.env.PGUSER || "postgres",
    PGPASSWORD: process.env.PGPASSWORD || "postgres",
    PGDATABASE: process.env.PGDATABASE,
    PGHOST: process.env.PGHOST,
    PGPORT: process.env.PGPORT || 5432,
    ENDPOINT_PREFIX: process.env.ENDPOINT_PREFIX || "/api",
    AUTH_ENDPOINT: process.env.AUTH_ENDPOINT || "/api/auth_v1/authenticate",
    AUTH_HOST: process.env.AUTH_HOST || "http://localhost:3001",
    DEVENV: process.env.DEVENV
}