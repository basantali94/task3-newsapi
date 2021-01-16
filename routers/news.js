const express = require('express')
const router = new express.Router()
const News = require('../models/news')
//////////////////////
//post
router.post('/news',(req,res)=>{
    const news = new News(req.body)
    news.save().then(()=>{
        res.status(200).send(news)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

///////////////////
router.get('/news/:id',(req,res)=>{
    // console.log(req.params)
    // console.log(req.params.id)
    const _id = req.params.id

    User.findById(_id).then((news)=>{
        if(!news){
            return res.status(400).send('Unable to find news')
        }
        res.status(200).send(news)
    }).catch((e)=>{
        res.status(500).send('Internal server error')
    })
})

/////////////////////////////
router.patch('/news/:id', async(req,res)=>{
    const updates = Object.keys(req.body) 
    const allowedUpdates = ['title','describtion']
    
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
      return  res.status(400).send("can not update")
    }
    const _id = req.params.id
    try{
    const user = await News.findByIdAndUpdate(_id,req.body,{
        new:true,
        runValidators:true
    })
    if(!news){
        return res.send('No news is found')
    }
    res.status(200).send(news)
    } catch(e){
        res.status(400).send('Error has occurred')
    }
})

////////////////////
router.delete('/news/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const news = await News.findByIdAndDelete(_id)
        if(!news){
            return res.status(400).send('Not found')
        }
        res.status(200).send(news)
    }
    catch(e){
        res.send(e)
    }
})


module.exports = router