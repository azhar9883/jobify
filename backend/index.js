
const express = require('express')
const mongoose = require('mongoose')
const route = require('./router/curdIndex')
const route1 = require('./router/curdJob')
const userModel = require('./module/user')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE','PUT'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

// connect your local database live . This is local database
mongoose.connect('mongodb://127.0.0.1:27017/curd');

const varifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            } else {
                if (decoded.role === "visitor") {
                    next();
                } else {
                    return res.status(403).json({ error: 'Forbidden: Not admin' });
                }
            }
        });
    }
};


// app.get('/dashboard',varifyUser,(req,res)=>{
//     res.json("Success")
// })

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({ name, email, password: hash })
                .then(user => res.json({ status: 'Ok',user }))
                .catch(err => res.json(err))
        }).catch(err => res.json(err))
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role },
                            "jwt-secret-key", { expiresIn: '1d' })
                        res.cookie('token', token)
                        return res.json({ status: "Success", role: user.role,token:token })
                    } else {
                        return res.json("the password is incorrect")
                    }
                })
            } else {
                return res.json('no record found')
            }
        })
})

app.use('/',varifyUser, route)
app.use('/',varifyUser, route1)
app.listen(4000, () => {
    console.log('app is connected')
})
