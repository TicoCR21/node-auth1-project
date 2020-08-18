const express = require( "express" );
const server = express();
const helmet = require( "helmet" );
const cors = require( "cors" );
const bcrypt = require( "bcryptjs" );
const session = require( "express-session" );
const KnexSessionStore = require( "connect-session-knex" )( session );
const protected = require( "../auth/protected-mw" );
const userRouter = require( "../users/users-router" );
const authRouter = require( "../auth/auth-router" );
const db = require( "../database/connection" );

server.use( helmet() );
server.use( express.json() );
server.use( cors() );

const sessionConfiguration = {
  name: "user_cookie",
  secret: "users personal information",
  cookie: {
    maxAge: 600000,
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
      knex: db,
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 3600000
    } )
}

server.use( session( sessionConfiguration ) );

server.use( "/api/users", protected, userRouter );
server.use( "/api/auth", authRouter );

server.get( "/", ( req, res ) => res.status( 200 ).json( "Api Running..." ) );

module.exports = server;