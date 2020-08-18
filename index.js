require( "dotenv" ).config();
const PORT_NUMBER = process.env.PORT || 5000;
require( "./api/server.js" ).listen( PORT_NUMBER, () => console.log( `Running on Port: ${ PORT_NUMBER }` ) );