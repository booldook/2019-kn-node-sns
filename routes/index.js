const express = require('express');
const router = express.Router();
const {Post, User} = require('../models');
const {isLogin, isLogout} = require('../passport/auth');

/* GET home page. */
router.get('/', async (req, res, next) => {
  //console.log(req.user);
  let result = await Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'username']
    }, 
    order: [['createdAt', 'DESC']]
  });
  //res.json(result);
  for(let item of result) {
    if(item.img) item.img = '/files/'+item.img.split("-")[0]+"/"+item.img;
  };
  res.render('index', { 
    title: 'SNS',
    user: req.user,
    lists: result  
  });
});

module.exports = router;
