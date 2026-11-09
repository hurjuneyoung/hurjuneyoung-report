import {build} from 'esbuild';
await build({entryPoints:['web/src/app.tsx'],bundle:true,outfile:'web/dist/app.js',minify:true,jsx:'automatic'});
