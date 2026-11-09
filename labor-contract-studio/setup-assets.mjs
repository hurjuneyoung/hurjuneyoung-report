import fs from 'node:fs/promises';
await fs.mkdir('web/dist',{recursive:true});
await fs.copyFile('node_modules/pdfmake/build/pdfmake.min.js','web/dist/pdfmake.min.js');
for(const [name,url] of Object.entries({'NanumGothic-Regular.ttf':'https://raw.githubusercontent.com/google/fonts/main/ofl/nanumgothic/NanumGothic-Regular.ttf','FONT-LICENSE.txt':'https://raw.githubusercontent.com/google/fonts/main/ofl/nanumgothic/OFL.txt'})){const r=await fetch(url);if(!r.ok)throw Error('Asset download failed: '+name);await fs.writeFile('web/dist/'+name,Buffer.from(await r.arrayBuffer()))}
