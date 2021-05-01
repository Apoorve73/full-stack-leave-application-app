const mysql = require("mysql") // import mysql 
let email = ''

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
}) // create connection to database

// login controller
exports.login = (req, res) => {

    try{

        let {email, password} = req.body
        
        if ( !email || !password ) {
            return res.status(400).render('index', 
            { message: 'Please provide an email and password'
        })
    }

        db.query('SELECT * FROM employee WHERE email = ?', [email], (error, results) => {
            if (error)
            {
                console.log(error)
            }
            
            if( results.length == 0 || password != results[0].password ) // if email and password combination not present in database
            {
                res.status(401).render('index',
                { message: 'Email or Password is incorrect'})
            }
            else{
                res.render('leave', {email: email})
            }
        })
    }
    catch(error) {
        console.log(error)
    }
}

// leave application controller
exports.save = (req, res) => {

    const { leave_type, leave_from, leave_to } = req.body

    db.query('UPDATE employee SET leave_type=?, leave_from=?, leave_to=? WHERE email=?', [leave_type, leave_from, leave_to, email], (error, results) => {
        if (error)
        {
        console.log(error)
        }

        if (results)
        {
            res.status(200).render('leave', 
            { message: 1 })
        }
        else
        {
            res.status(401).render('leave', 
            { message: 0})
        }
    })
   
}
