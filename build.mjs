import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const out = path.join(root, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const file of ['index.html', 'game.js', 'style.css']) {
  if (!fs.existsSync(path.join(root, file))) throw new Error('Missing required file: ' + file);
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}
for (const dir of ['assets']) {
  if (fs.existsSync(path.join(root, dir))) fs.cpSync(path.join(root, dir), path.join(out, dir), { recursive: true });
}
const phaser = path.join(root, 'node_modules/phaser/dist/phaser.min.js');
if (!fs.existsSync(phaser)) throw new Error('Phaser package is missing. Run npm install first.');
fs.copyFileSync(phaser, path.join(out, 'phaser.min.js'));
console.log('Android web bundle ready:', out);
