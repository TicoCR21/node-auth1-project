const router = require( "express" ).Router();
const bcrypt = require( "bcryptjs" );

const hf = require( "../users/users-model" );

router.post( "/register", ( req, res ) =>
{
  const { username, password } = req.body;

  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync( password, rounds );

  hf.add( { username, password: hash } )
    .then( response =>
      {
        res.status( 201 ).json( { data: response } )
      } )
      .catch( error => res.status( 500 ).json( { error } ) )
} );

router.post( "/login", ( req, res ) => 
{
  let { username, password } = req.body;

  hf.findBy( { username } )
    .then( response => 
      {
        const user = response[ 0 ];

        if( user && bcrypt.compareSync( password, user.password ) )
        {
          req.session.loggedIn = true;
          res.status( 200 ).json( {
            hello: user.username,
            session: req.session
          } );
        }
        else
        {
          res.status( 401 ).json( { error: "you shall not pass!" } );
        }
      } )
    .catch( error => res.status( 500 ).json( { error } ) )
} );

module.exports = router;