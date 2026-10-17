const sharp=require('sharp'),fs=require('fs'),path=require('path');
(async()=>{const d=process.argv[2];const out=process.argv[3];fs.mkdirSync(out,{recursive:true});
for(const f of fs.readdirSync(d).sort()){
 const {data,info}=await sharp(path.join(d,f),{density:288}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 await sharp(path.join(d,f),{density:144}).flatten({background:'#ffffff'}).png().toFile(path.join(out,f.replace('.svg','.png')));
 const W=info.width,H=info.height;let e={t:0,b:0,l:0,r:0};
 for(let x=0;x<W;x++){if(data[(x)*4+3]>40)e.t++;if(data[((H-1)*W+x)*4+3]>40)e.b++;}
 for(let y=0;y<H;y++){if(data[(y*W)*4+3]>40)e.l++;if(data[(y*W+W-1)*4+3]>40)e.r++;}
 const hit=Object.entries(e).filter(([k,v])=>v>0).map(([k,v])=>k+':'+v).join(' ');
 if(hit)console.log(f,W+'x'+H,hit);}
console.log('done');})();
