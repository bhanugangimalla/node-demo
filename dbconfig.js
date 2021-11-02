
const config = {
    user :'weone',
    password :'Positive@123',
    server:'weone.database.windows.net',
    database:'rajeshsql',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS'
    },
    port : 1433
}

module.exports = config; 