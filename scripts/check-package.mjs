import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// Validate what a consumer installs, without publishing a package.
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const [packed] = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
}));
const files = new Set(packed.files.map(file => file.path));
const targets = [pkg.main, ...Object.values(pkg.exports)];
assert.ok(targets.length > 0, 'Package must expose its CSS');
for (const target of targets) {
  assert.equal(typeof target, 'string', 'Expected a file export');
  assert.ok(files.has(target.replace(/^\.\//, '')), `Export missing from package: ${target}`);
}
assert.ok(files.has('LICENSE'), 'Package must include its license');
console.log(`Package verified: ${targets.length} entrypoints are present in the tarball file list`);
