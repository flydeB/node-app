var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017'

var dnName = 'register'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' })
});

router.get('/business_detail',function(req,res,next){
   res.render('business_detail',{title:'business_detail'})
});


router.get('/business_comment',function(req,res,next){
   res.render('business_comment',{title:'business_comment'})
});

router.get('/loading',function(req,res,next){
    res.render('loading',{title:'loading'})
})

router.post('/toLoad',function(req,res){
    let user = req.body.user;
    let pws = req.body.pws;
    __connectDB((err,db,client)=>{
      if(err){
          console.log(err);
          return
      }
      let collection = db.collection('user')
        collection.find({user:user}).toArray(function(err,docs){
             if(err){
                 console.log(err);
                 return
             }
            if(docs.length<=0){
               res.send('用户不存在')
            }else{
                if(docs[0].pws === pws){
                    res.send('登陆成功')
                }else{
                    res.send('请输入正确的密码')
                }
            }
        })
    })

})

module.exports = router;

function __connectDB(callback){
   mongoClient.connect(dbUrl,(err,client)=>{
        if(err){
            console.log(err)
            return
          callback('error at connect',null,client)
        }

        let db = client.db(dnName)
       callback(null,db,cilent)

   })
}
