#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'node:fs';
import generateDiff from '../src/generatediff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const json1 = fs.readFileSync(filepath1);
    const json2 = fs.readFileSync(filepath2);
    const result = generateDiff(json1, json2);
    console.log(result);
    // const options = program.opts();
    // if (options.format) console.log(`format: ${options.format}`);
  });

program.parse();
