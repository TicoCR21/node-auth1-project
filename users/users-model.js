const db = require( "../database/connection" );

const find = () => db( "users" ).select( "id", "username" ).orderBy( "id" ); 

const findBy = filter => db( "users" ).where( filter ).orderBy( "id" );

const findById = id => db( "users" ).where( { id } ).first();

const add = user => db( "users" )
                      .insert( user, "id" )
                      .then( response => "user added" )
                      .catch( error => error )

module.exports = { find, findBy, findById, add };