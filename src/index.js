const yargs=require('yargs');
const Server=require('./app');
const argv=yargs
.usage('anywhere [options]')
.option('p',{
  alias:'port',
  discribe:'端口号',
  default:9527,
}).option('h',{
  alias:'hostname',
  discribe:'主机地址',
  default:'127.0.0.1',
}).option('d',{
  alias:'root',
  discribe:'root path',
  default:process.cwd(),
})
.version()
.alias('v','version')
.help()
.argv;

const server=new Server(argv);
server.start();
