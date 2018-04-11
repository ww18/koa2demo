const Koa = require('koa');
//import co from 'co';
const co = require('co');
const convert = require('koa-convert');
const koastatic = require('koa-static');
const Router = require('koa-router');
const render = require('koa-swig');
const path = require('path');
 
var app = new Koa();
var router = new Router();
app.context.render = co.wrap(render({
	root: path.join(__dirname, '/views'),
	autoescape: true,
	cache: 'memory', // disable, set to false 
	ext: 'html',
	writeBody: false
}))
app.use(router.routes(),router.allowedMethods());

//目前支持了
app.use(koastatic(__dirname + '/public'));

router.get('/', async(ctx, next) => {
  // ctx.router available
  ctx.body = await ctx.render('index.html');
});
 



app.listen(3000);