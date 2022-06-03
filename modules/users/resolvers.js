const { sign } = require( '../../utils/jwt' );
const {createLibrarian, createUser, createReader, getFile, checkUser, findReader, findLibrarian}  = require('./model')

module.exports.resolvers = {
  Query: {
   
  },
  Librarian: {
      firstName: global => global.first_name,
      lastName: global => global.last_name,
      file: async ( global ) =>{
        let fileSrc = await getFile( global.file_id )   
        // @ts-ignore
        return fileSrc.src
      }
  },
  Reader: {
      firstName: global => global.first_name,
      lastName: global => global.last_name,
      file: async ( global ) =>{
        let fileSrc = await getFile( global.file_id ) 
        // @ts-ignore
        return fileSrc.src
      }
  },
  Mutation: {
    createLibrarian: async( _,{username, password, phone, firstName, lastName, file, email,library }) =>{
      try{
        const user = await createUser( username, password, 2)
        // @ts-ignore
        const librarian = await createLibrarian( user.user_id, phone, firstName, lastName, file, email, library )  
        const token = sign({ username, userType:"librarian"} )  
        return {
          status: 201,
          data:{
            ...user,
            ...librarian
          },
          message: "successfully created librarian",
          token
        }
      
      } catch ( err ){   
        return {
          status: 409,
          data: null,
          message: err.message          
        }
      }
    },
    createReader: async( _,{username, password, phone, firstName, lastName, file }) =>{
      try{
        const user = await createUser( username, password, 1)
        // @ts-ignore
        const reader = await createReader( user.user_id, phone, firstName, lastName, file )
        const token = sign({ username, userType:"reader"} )         
        return  {
          status: 201,
          data:{
            ...user,
            ...reader
          },
          message: "successfully created reader",
          token
        }
      
      } catch ( err ){
         return {
          status: 409,
          data: null,
          message:err.message
        }
      }
    },
    checkReader: async( _,{username, password }) =>{
      try{   
        const user = await checkUser( username, password, 1 ) 
        // @ts-ignore
        const reader = await findReader( user.user_id )
        const token = sign({ username, userType:"reader"} )        
      
        return  {
          status: 200,
          data:{
            ...user,
            ...reader
          },
          message: "successfully find reader",
          token
        }
      
      } catch ( err ){
         return {
          status: 409,
          data: null,
          message:err.message
        }
      }
    },
    checkLibrarian: async( _,{username, password }) =>{
      try{   
        const user = await checkUser( username, password, 2 ) 
        // @ts-ignore
        const library = await findLibrarian( user.user_id )       
        const token = sign({ username, userType:"librarian"} )      
       
        return  {
          status: 200,
          data:{
            ...user,
            ...library
          },
          message: "successfully find librarian",
          token
        }
      
      } catch ( err ){
         return {
          status: 409,
          data: null,
          message:err.message
        }
      }
    },
    checkUser:async( _,{username, password }) =>{
      try{   
        const user = await checkUser( username, password, 3 ) 
        // @ts-ignore    
        const token = sign({ username, userType:"admin"} )      
       
        return  {
          status: 200,
          data:{
            ...user
          },
          message: "successfully find admin",
          token
        }
      
      } catch ( err ){
         return {
          status: 409,
          data: null,
          message:err.message
        }
      }
    },
  }
};