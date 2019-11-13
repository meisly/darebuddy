module.exports = {
  development: {
    username: "root",
    password: process.env.sqlPassword,
    database: "darebuddy",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
