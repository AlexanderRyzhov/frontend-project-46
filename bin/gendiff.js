#!/usr/bin/env node
import { Command } from 'commander';

import generateDiff from '../src/generatediff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const result = generateDiff(filepath1, filepath2, options.format);
    console.log(result);
  });

program.parse();
