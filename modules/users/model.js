const { modelAll, modelSingle } = require( '../../utils/pool' );

const CREATE_USER = "INSERT INTO users(username, password, user_status) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING username, user_id";
const CREATE_READER = "INSERT INTO readers(user_id, phone, first_name, last_name, file_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const CREATE_LIBRARIAN = "INSERT INTO users(user_id, phone, first_name, last_name, file_id, email, library) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

const createUser = (username, pasword, userStatus) => modelSingle( CREATE_USER, username, pasword, userStatus );
const createReader = ( userId, phone, firstName, lastName, fileId ) => modelSingle( CREATE_READER, userId, phone, firstName, lastName, fileId );
const createLibrarian = ( userId, phone, firstName, lastName, fileId, email, library ) => modelSingle( CREATE_LIBRARIAN, userId, phone, firstName, lastName, fileId,email, library );

module.exports = {
  createUser,
  createReader,
  createLibrarian
};