const knex = require( "knex" );
const knexFile = require( "../knexfile" );

const enviroment = process.env.NODE_ENV || "development";

module.exports = knex( knexFile[ enviroment ] );