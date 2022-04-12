const { modelAll, modelSingle } = require( '../../utils/pool' );

const CREATE_USER = "INSERT INTO users(username, password, user_status) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING username, user_id";
const CREATE_READER = "INSERT INTO readers(user_id, phone, first_name, last_name, file_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const CREATE_LIBRARIAN = "INSERT INTO librarians(user_id, phone, first_name, last_name, file_id, email, library) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
const GET_FILE_INFO = "SELECT* from files where file_id=$1"
const FIND_USER = "SELECT * FROM users WHERE username=$1 AND password = crypt($2,password ) AND user_status = $3"
const FIND_READER = "SELECT * FROM readers WHERE user_id=$1"
const FIND_LIBRARY = "SELECT * FROM librarians WHERE user_id=$1"


const createUser = (username, password, userStatus) => modelSingle( CREATE_USER, username, password, userStatus );
const createReader = ( userId, phone, firstName, lastName, fileId ) => modelSingle( CREATE_READER, userId, phone, firstName, lastName, fileId );
const createLibrarian = ( userId, phone, firstName, lastName, fileId, email, library ) => modelSingle( CREATE_LIBRARIAN, userId, phone, firstName, lastName, fileId,email, library );
const getFile = (fileId) =>modelSingle(GET_FILE_INFO, fileId)
const checkUser = (username, password, userStatus) => modelSingle( FIND_USER, username, password, userStatus );
const findReader = (userId) => modelSingle(FIND_READER, userId)
const findLibrarian = ( userId ) => modelSingle( FIND_LIBRARY, userId )

module.exports = {
  createUser,
  createReader,
  createLibrarian,
  getFile,
  checkUser,
  findReader,
  findLibrarian
};