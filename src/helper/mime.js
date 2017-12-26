/*
@author wangybg
@discription mimeType
*/
const path=require("path");

const mimeTypes ={
  "css":"text/css",
  "gif":"image/gif",
  "html":"text/html",
  "ico":"image/x-icon",
  "jepg":"image/jepg",
  "jpg":"image.jpg",
  "js":"text/javascript",
  "json":"application/json",
  "pdf":"application/pdf",
  "png":"image/png",
  "svg":"image/svg+xml",
  "swf":"application/x-shockwave-flash",
  "tiff":"image/tiff",
  "txt":"text/plain",
  "wav":"audio/x-wav",
  "wma":"audio/x-ms-wma",
  "wmv":"audio/x-ms-wmv",
  "xml":"text/xml"
};
module.exports=(filepath)=>{

  let ext=path.extname(filepath).split('.').pop().toLowerCase();

  if(!ext){
    ext=filepath;
  }
  return mimeTypes[ext]||mimeTypes['txt'];
};
