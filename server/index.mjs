import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {getDirections} from './providers/naver-directions.mjs';
const project=resolve(fileURLToPath(new URL('..',import.meta.url)));
const root=resolve(project,'dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
export function routeRequest(requestUrl){const u=new URL(requestUrl,'http://localhost');return u;}
export const server=createServer(async(req,res)=>{
 try{
  const u=routeRequest(req.url??'/');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options','DENY');
  if(u.pathname==='/api/health'){res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'}).end(JSON.stringify({status:'ok',liveData:false}));return;}
  if(u.pathname==='/api/directions'){
   try{const data=await getDirections({start:u.searchParams.get('start'),goal:u.searchParams.get('goal'),fueltype:u.searchParams.get('fueltype')||'gasoline',mileage:Number(u.searchParams.get('mileage')||12),cartype:u.searchParams.get('cartype')||'1'});res.writeHead(200,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}).end(JSON.stringify(data))}
   catch(err){const code=err.code==='NOT_CONFIGURED'?503:err.code==='UPSTREAM_ERROR'?502:400;res.writeHead(code,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}).end(JSON.stringify({error:err.message}))}return;
  }
  if(!existsSync(root)){res.writeHead(503,{'content-type':'text/plain; charset=utf-8'}).end('Frontend is not built. Run npm install && npm run build.');return;}
  const pathname=decodeURIComponent(u.pathname);
  const file=resolve(root,`.${pathname==='/'?'/index.html':pathname}`);
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end('Forbidden');return;}
  try{const body=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream','cache-control':'public, max-age=300'}).end(body)}
  catch{res.writeHead(404).end('Not Found')}
 }catch{res.writeHead(400).end('Bad Request')}
});
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){const port=Number(process.env.PORT)||5174;server.listen(port,'127.0.0.1',()=>console.log(`RESTWAY http://127.0.0.1:${port}`))}
