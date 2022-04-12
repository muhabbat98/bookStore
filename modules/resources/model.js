const { modelAll, modelSingle } = require( '../../utils/pool' );

const CREATE_RESOURCE = "INSERT INTO resourses(title,subject,description,type,file_id,cover_id,publisher,date,language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *";
const RESOURCES = "SELECT * FROM resourses"
const RESOURCE = "SELECT * FROM resourses WHERE resourse_id=$1"


const createResource = (title,subject,description,type,fileId,coverId,publisher,date,language) => modelSingle( CREATE_RESOURCE, title,subject,description,type,fileId,coverId,publisher,date,language )
const getResourse = (resourceId) => modelSingle(RESOURCE, resourceId)
const getResourses = () => modelAll( RESOURCES )

module.exports = {
  createResource,
  getResourse,
  getResourses
};