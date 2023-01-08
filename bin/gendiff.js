#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(`filepath1:  ${filepath1}`);
    console.log(`filepath2:  ${filepath2}`);
    const options = program.opts();
    if (options.format) console.log(`format: ${options.format}`);
  });
  
  program.parse();
