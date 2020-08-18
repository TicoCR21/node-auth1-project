const router = require( "express" ).Router();
const hf = require( "./users-model.js" );

router.get( "/", ( req, res ) =>
{
  hf.find()
    .then( response => res.status( 200 ).json( response ) )
    .catch( error => res.status( 401 ).json( error ) );
} );

module.exports = router;