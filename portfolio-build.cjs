const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = __dirname;
const source = path.join(root, 'portfolio');
for (const file of ['index.html', 'styles.css', 'app.js', 'assets/Yerra_Kamal_Kumar_Resume.pdf']) {
  if (!fs.existsSync(path.join(source, file))) throw new Error(`Missing portfolio asset: ${file}`);
}
execFileSync(process.execPath, ['--check', path.join(source, 'app.js')], { stdio: 'inherit' });
const destination = path.join(root, 'dist');
fs.rmSync(destination, { recursive: true, force: true });
fs.cpSync(source, destination, { recursive: true });
console.log('Portfolio validated and built to dist/');
