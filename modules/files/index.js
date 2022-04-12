const multer = require( 'multer' )
const {createFile} = require('./model')
const storage = multer.diskStorage({
    destination: (req, file, cb)=> cb(null, './uploads') ,
    filename: ( req, file, cb ) =>cb( null,  Date.now() + '-' + file.originalname  )
})

const upload = multer({ storage: storage })

const fileUrl = upload.fields( [ { name: 'image', maxCount: 1 }, { name: 'file', maxCount: 8 } ] )

const fileController = async ( req, res ) =>{
    let fileInfo, imageInfo
    if ( req.files.file ){
        fileInfo = await createFile(req.files.file[0].destination.slice(1,req.files.file[0].destination.length)+'/'+req.files.file[0].filename, req.files.file[0].mimetype)
    }
    if ( req.files.image )
    {
        console.log(req.files.image[0].filename)
        imageInfo = await createFile(req.files.image[0].destination.slice(1,req.files.image[0].destination.length )+'/'+req.files.image[0].filename, req.files.image[0].mimetype)        
    }
    res.send( {
        file: fileInfo,
        image:imageInfo
    })
};

module.exports = {
    fileController,
    fileUrl
};