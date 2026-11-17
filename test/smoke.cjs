const fs=require('node:fs');
const assert=require('node:assert/strict');
const version=JSON.parse(fs.readFileSync('version.json','utf8')).version;
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
assert.match(version,/^\d+\.\d+\.\d+$/);
assert.equal(pkg.version,version,'package.json must match version.json');
for(const path of ['index.html','www/index.html']){
 const html=fs.readFileSync(path,'utf8');
 assert.ok(html.includes("MATHLAB_VERSION='"+version+"'"),path+' version mismatch');
 assert.ok(html.includes('updateNotice'),path+' update prompt missing');
 assert.ok(html.includes('mathlab-progress'),path+' local progress missing');
 assert.ok(!html.includes('SGE Diário'),path+' includes unrelated project');
}
const cfg=fs.readFileSync('capacitor.config.ts','utf8');
assert.ok(cfg.includes('br.com.nabikendo.mathlab'));
assert.ok(fs.readFileSync('www/index.html','utf8').includes('releases/tag/v'));
console.log('MathLab static smoke checks passed');
