import arg from 'arg';
import chalk from 'chalk';
import * as actions from './client.mjs';
import * as suggestor from './suggestor.mjs';
import { args } from '../args.mjs';

class colors {
 error(msg) {
  msg = chalk.red.bold(msg);
  console.log(msg.trim());
 }
 warn(msg) {
  msg = chalk.yellow.bold(msg);
  console.log(msg.trim());
 }
 success(msg) {
  msg = chalk.green.bold(msg);
  console.log(msg.trim());
 }
}
const Colors = new colors();

function argsToOptions(rawArgs) {
 let argObject = {};
 let returnArgs = {};
 for (let _arg in args) {
  if (_arg.hasOwnProperty('type') && _arg.hasOwnProperty('default')) {
   return Colors.error('Cannot have both a default value and a type for an argument.');
  }
  
  if (_arg.startsWith('--')) {
   argObject[_arg] = (args[_arg].hasOwnProperty('type'))
     ? args[_arg].type
     : args[_arg].default;
  }
 }
 const _args = arg(
   argObject,
   {
     permissive: true
   }
 );
 
 for (let _arg in args) {
  let indexOfArg = _args._.indexOf(_arg);
  if (indexOfArg !== -1) {
   returnArgs[_arg] = _args._[indexOfArg+1] || false;
   
   _args._.splice(indexOfArg, 2);
  }
 }
 
 returnArgs._ = _args._
 
 return returnArgs
}

function validateOptions(options) {
 if (!options || !Object.keys(options).length) {
  return Colors.error(`
  Error: No options specified. For help, please use the --help flag.
  
  > wpm --help
  `);
 }

 for (let option in options._) {
  if (!args[option]) {
   return Colors.error(`
   Error: Unknown option '${options._[option]}'. Did you mean:
  
   > wpm ${suggestor.guess(options._[option])} ?
   `);
  }
 }
 if (options.install === options.uninstall) {
  return Colors.error(`
  Error: Conflicting options. For help, please use the --help flag.
	
  > wpm --help
  `);
 }
 
 return showOutput(options);
}

function showOutput(options) {
 if (options.help) {
  console.log(`
  All commands:
 
 `.trim());
  for (let _arg in args) {
	console.log(`    ${_arg.help}`)
  }
 }
 if (options.update) actions.update();
 if (options.install) return actions.install(options.install);
 if (options.uninstall) return actions.uninstall(options.uninstall);
}

function cli(args) {
  const options = argsToOptions(args);
  return validateOptions(options)
}

export { Colors, cli }
