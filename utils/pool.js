const {Pool} = require('pg')
const { connectionString } = require( './urls' )

const pool = new Pool({connectionString})

const modelAll = async (QUERY, ...params) =>
{
    const client = await pool.connect()
    try{
        const { rows } = await client.query( QUERY, params.length ? params : [] )
        return rows
    }
    finally{   
        client.release()        
    }
}

const modelSingle = async (QUERY, ...params) =>
{
    const client = await pool.connect()
    try{
        const { rows:[single] } = await client.query( QUERY, params.length ? params : [] )
        return single
    }
    finally{   
        client.release()        
    }
}

module.exports = {
    modelSingle,
    modelAll
}