const fs=require('fs');
const path=require('path');
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
/*
@author wangybg
@discription 路由
*/
const readdir=promisify(fs.readdir);
const handlebars=require('handlebars');
//const conf=require('../config/defaultConfig');

const tplpath=path.join(__dirname,'../template/dir.tpl');
const source=fs.readFileSync(tplpath,'utf-8');
const template=handlebars.compile(source);

const mime=require('./mime');

const compress=require('./compress');
const range=require('./range');
const isFresh=require('./cache');
module.exports=async function (req,res,filepath,conf){
 try {
   const stats= await stat(filepath);
   if(stats.isFile()){
     const contentType=mime(filepath);
     res.setHeader('Content-Type',contentType);
    if(isFresh(stats,req,res)){
      res.statusCode=304;
      res.end();
      return ;
    }

     let rs;
     const{code,start,end}=range(stats.size,req,res);
     if(code==200){
      res.statusCode=200;
      rs=fs.createReadStream(filepath);
     }else {
      res.statusCode=206;
      rs=fs.createReadStream(filepath,{start,end});
     }
     if(filepath.match(conf.compress)){
       rs=compress(rs,req,res);
     }
     rs.pipe(res);
   }else if(stats.isDirectory()){
    const files=await readdir(filepath);
    res.statusCode=200;
    res.setHeader('Content-Type',"text/html");
    const dir=path.relative(conf.root,filepath);
    const data={
      title:path.basename(filepath),
      dir:dir ? `/${dir}`:'',
      files
    };
    res.end(template(data));
   }
 } catch (error) {
  res.statusCode=404;
  res.setHeader('Content-Type',"text/plain");
  res.end("file is not found");
 }
};
