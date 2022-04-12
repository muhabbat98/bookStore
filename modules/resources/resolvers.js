// @ts-ignore
const { sign } = require( '../../utils/jwt' );
const { getFile } = require( '../users/model' );
const {createResource, getResourses}  = require('./model')

module.exports.resolvers = {
  Query: {
    resources:()=>getResourses()
  },
  Resource: {
    id:global=>global.resourse_id,
    file: async(global) =>{
      const fileSrc = await getFile( global.file_id )
      // @ts-ignore
      return fileSrc?.src
    },
    cover: async(global) => {
      const imgSrc = await getFile( global.cover_id )
      // @ts-ignore
      return imgSrc?.src
    }
  },  
  Mutation: {
    createResource: async ( _, { title, subject, description, type, file, cover, publisher, date, language } ) =>{
      const resource = await createResource( title, subject, description, type, file, cover, publisher, date, language )
      return resource
    }
  }
};