const express = require('express')
const app = express()

const adminRoutes= require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')
const accountRoutes = require('./routes/accountRoutes.js')

const errorsController = require('./controllers/errors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('./models/userModel')

require('dotenv').config()


//_________________________________________________________________

app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req,res,next) => {
        User.findOne({name:'ugurhmz'})
            .then(user => {
                req.user = user
                next()
            })
            .catch(err => {
                console.log(err)
            })
})




//______________________________ routes ___________________________________
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(accountRoutes)
app.use(errorsController.get404Page);




mongoose.connect(`mongodb+srv://craxx3131:${process.env.PASSWORD}@btkapp.in0gt.mongodb.net/node-appDB?retryWrites=true&w=majority`)
        .then(() => {
            console.log('Bağlantı gerçekleşti....')

            User.findOne({name: 'ugurhmz'})

                .then(user => {
                    if (!user) {

                        user = new User({
                            name: 'ugurhmz',
                            email: 'ugur@test.com',
                            cart: {
                                items: []
                            }
                        })
                        return user.save()
                    }
                    return user
                })

                .then(user => {

                    app.listen(3000)
                }) .catch(err => {
                         console.log(err)
                     })

        })