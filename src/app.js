const http=require("http");
const conf=require("./config/defaultConfig");
const chalk=require("chalk");
const path=require('path');

const router=require('./helper/router');
const server=http.createServer((req,res)=>{

  //res.setHeader('Context-Type','text/plain');
  //res.end('hello wangybg');
  // res.statusCode=200;
  // res.setHeader('Context-Type','text/html');
  //res.write('<html><body style="color:green">hello wangybg</body>');
  //res.end('</html>');
  const filePath=path.join(conf.root,req.url);
  router(req,res,filePath);
  // fs.stat(filePath,(err,stat)=>{
  //   if(err){
  //     res.statusCode=404;
  //     res.setHeader('Context-Type','text/plain');
  //     res.end(`${filePath} not found`);
  //   }else if(stat.isFile()){
  //     res.statusCode=200;
  //     res.setHeader('Context-Type','text/plain');
  //     //效率低
  //     // fs.readFile(filePath,(err,data)=>{
  //     //   res.end(data);
  //     // });
  //     fs.createReadStream(filePath).pipe(res);
  //   }else if(stat.isDirectory()){
  //     fs.readdir(filePath,(err,files)=>{
  //       res.statusCode=200;
  //       res.setHeader('Context-Type','text/plain');
  //       res.end(files.join(','));
  //     });

  //   }
  // });
});

server.listen(conf.port,conf.hostname,()=>{
    const addr=`http://${conf.hostname}:${conf.port}`;
    console.log(`server start at ${chalk.green(addr)}`);
});
