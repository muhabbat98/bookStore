const jwt = require( 'jsonwebtoken' );
const SECRET_KEY = 'lier23'

const sign = ( username) => jwt.sign( { username}, SECRET_KEY );
const verify = ( token ) => jwt.verify( token, SECRET_KEY );

module.exports = {
    sign,
    verify
};