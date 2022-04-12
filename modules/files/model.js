const { modelAll, modelSingle } = require( '../../utils/pool' );

const CREATE_READER = "INSERT INTO files(src, type) VALUES ($1, $2) RETURNING *";

const createFile = ( path, type ) => modelSingle( CREATE_READER, path, type);

module.exports = {
  createFile
};