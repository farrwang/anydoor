const fs=require('fs');
const path=require('path');
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);
const handlebars=require('handlebars');
const conf=require('../config/defaultConfig');

const tplpath=path.join(__dirname,'../template/dir.tpl');
const source=fs.readFileSync(tplpath,'utf-8');
const template=handlebars.compile(source);

module.exports=async function (req,res,filepath){
 try {
   const stats= await stat(filepath);
   if(stats.isFile()){
     res.statusCode=200;
     res.setHeader('Content-Type',"text/plain");
     fs.createReadStream(filepath).pipe(res);
   }else if(stats.isDirectory()){
    const files=await readdir(filepath);
    res.statusCode=200;
    res.setHeader('Content-Type',"text/html");
    const data={
      title:path.basename(filepath),
      dir:path.relative(conf.root,filepath),
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
