import { Colors } from './parser.mjs';
import axios from 'axios';
import { writeFile } from 'fs';
import npm from 'npm-programmatic';
import process from 'process';
import path from 'path';
import fs from 'fs';

export async function update(url="https://flancast90.github.io/wpm/wasp.json") {
 try {
  const latest = await axios.get(url);
  if (latest.status === 200) return writeToErrors(latest.data)
  else return Colors.warn("Error: Could not update known packages file.");
 } catch(e) {
  return Colors.warn("Error: Could not update known packages file.");
 }
}

function writeToErrors(data) {
 writeFile('wasp.json', data, function (err) {
  if (err) return Colors.error(err);
  return Colors.success("Success: Updated known packages file.")
 });
}

export function install(name) {
 const pkgs = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'wasp.json')));
 
 if (pkgs.hasOwnProperty(name)) return Colors.error(pkgs[name].error);
 npm.install([name], {
  cwd: process.cwd(),
  save: true
 }).then(function() {
  return Colors.success("Success! Package '${name}' installed in /node_modules");
 }).catch(function() {
  return Colors.error("Error: unable to install package '${name}'");
 });
}

export function uninstall(name) {
 npm.list(process.cwd()).then(function(res) {
  if (res.includes(name)) {
    npm.uninstall([name], {
     cwd: process.cwd(),
     save: true
    }).then(function() {
     Colors.success("Package '${name} uninstalled successfully.");
    }).catch(function() {
     Colors.error("Unknown error uninstalling '${name}'.");
    });
  } else {
    return Colors.error("Error: package '${name}' not installed.");
  }
 });
}
