var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')


/*
 * Init db connection
 */
mongoose.connect('mongodb://localhost:27017/canpicker');

var db = mongoose.connection
db.on('error', function(){
    console.log('Error while connecting to db')
})

db.on('open', function(){
    console.log('connected to db')
})

/*
    Init model
 */
var PickSchema = mongoose.Schema({
    date : Date,
    duration : {
        type : Number,
        default : 4,
        min : 4,
        max : 24
    },
    latitude : String,
    longitude : String,
    address : {
        street : String,
        number : String,
        zipcode : {
            type : String,
            maxLength : 7
        },
        ville : {
            type : String,
            default : 'montreal'
        },
        country : {
            type : String,
            default : 'canada'
        }
    },
    inStreet : Boolean
})
var Pick = mongoose.model('Pick', PickSchema)

/*
    Init backend
 */
app.use(bodyParser.urlencoded({
    extended : false
}))

app.get('/api/picks', function(req, res){
    Pick.find(function(err, picks){
        if(err)
            throw err

        res.send(picks)
    })
})

app.post('/api/picks', function(req, res){
    var newPick = req.body.pick;
    //todo

})

app.use('*', function(req, res){
    res.sendFile('index.html',{
        root : __dirname + '/www',
        dotfiles : 'deny'
    })
})
app.use(express.static('www'))

var server = app.listen(3000)
