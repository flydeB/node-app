var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017'

var dbName = 'register'

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

/*登陆*/
router.get('/loading',function(req,res,next){
    res.render('loading',{title:'loading'})
})

router.get('/graduate',function(req,res,next){
    res.render('graduate',{title:'graduate'})
})

router.get('/graduate_info',function(req,res,next){
    res.render('graduate_info',{title:'graduate_info'})
})

/*注册*/
router.get('/register',function(req,res){
    res.render('register',{title:'register'})
})

router.post('/toRegister',function(req,res){
    let userName = req.body.user;
    let psw = req.body.psw;
    __connectDB((err,db)=>{
        if(err){
            console.log(err)
            return
        }
        let collection = db.collection('user')
        collection.find({userName:userName}).toArray((err,docArr)=>{
            if(err){
                console.log(err)
                res.send('注册失败！！')
                return
            }
            if(docArr.length>0){
                res.send('账号已经被注册了！！')
                return
            }else{
                collection.insertMany([{userName,psw}],(err,result,client)=>{
                    if(err){
                        console.log(err)
                        res.send('注册失败')
                        client.close()
                        return
                    }
                    console.log(result)
                    res.redirect('/loading')
                })
            }
        })
    })
})

/*登陆*/
router.post('/toLoad',function(req,res){
    let userName = req.body.user;
    let psw = req.body.psw;
    __connectDB((err,db,client)=>{
      if(err){
          console.log(err);
          return
      }
      let collection = db.collection('user')
        collection.find({userName:userName}).toArray(function(err,docs){
             if(err){
                 console.log(err);
                 return
             }
            if(docs.length<=0){
               res.send('用户不存在')
            }else{
                if(docs[0].psw === psw){
                    res.send('登陆成功')
                    // res.redirect('/index')
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

        let db = client.db(dbName)
       callback(null,db,client)

   })
}
