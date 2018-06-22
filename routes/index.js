var express = require('express');
var router = express.Router();

const mongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017'
var dbName = 'register'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' })
});

/*GET /business_detail*/
router.get('/business_detail',function(req,res,next){
   res.render('business_detail',{title:'business_detail'})
});

/*GET graduate_detail*/
router.get('/graduate_detail', function(req, res, next) {
    res.render('graduate_detail', { title: 'graduate_detail' });
});

/*GET loading*/
router.get('/loading',function(req,res,next){
    res.render('loading',{title:'loading'})
})

/*GET graduate*/
router.get('/graduate',function(req,res,next){
    res.render('graduate',{title:'graduate'})
})

/*GET graduate_info*/
router.get('/graduate_info',function(req,res,next){
    res.render('graduate_info',{title:'graduate_info'})
})

/*GET graduate_comment*/
router.get('/graduate_comment',function(req,res,next){
    res.render('graduate_comment',{title:'graduate_comment'})
})

/*GET graduate_detail*/
router.get('/graduate_detail',function(req,res,next){
    res.render('graduate_detail',{title:'graduate_detail'})
})

/*GET register*/
router.get('/register',function(req,res){
    res.render('register',{title:'register'})
})

/*POST toRegister*/
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

/*POST toLoad*/
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

/*提交点评信息*/
 router.post('/graduate_talk',function(req,res){
     let name = req.body.name;
     let score = req.body.score;
     let env = req.body.env;
     let sal = req.body.nsal;
     let cul = req.body.cul;
     let hap = req.body.hap;
     let eat = req.body.eat;
     let textarea = req.body.textarea

     __connectDB((err,db)=>{
         if(err){
             condole.log(err)
             return
         }
         let collection = db.collection('company')
         var data = {name,score,env,sal,cul,hap,eat,textarea}
         collection.insert(data,(err,result,client)=>{
             if(err){
                 console.log(err)
                 client.close()
                 res.send('评论失败')
                 return;
             }
             console.log(result)
             res.redirect('/business_comment')
         })
     })
 })

 /*从数据库中拿到数据渲染在business_comment上面*/
router.get('/business_comment',function(req,res,next){
    var selectData = function(db,callback){
        __connectDB((err,db)=>{
            if(err){
                console.log(err)
                return
            }
            var collection = db.collection('company');
            collection.find().toArray(function(err,result){
                if(err){
                    console.log(err)
                    return;
                }
                callback(result)
            })
        })
    }

    mongoClient.connect(dbUrl,function(err,db){
        selectData(db,function(result){
            console.log(result)
            res.render('business_comment',{title:'business_comment',data:result})
        })
    })
});


module.exports = router;

/*链接 数据库的函数*/
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
