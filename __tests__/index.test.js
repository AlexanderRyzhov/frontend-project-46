import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import * as fs from 'node:fs';
import generateDiff from '../src/generatediff.js';

let currentDirname;
const getFixturePath = (filename) => join(currentDirname, '..', '__fixtures__', filename);

beforeAll(() => {
  const filename = fileURLToPath(import.meta.url);
  currentDirname = dirname(filename);
});

describe('generateDiff - flat json files compare', () => {
  test('no diff', () => {
    const json1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
    const result11 = fs.readFileSync(getFixturePath('result11.txt'), 'utf-8');
    expect(generateDiff(json1, json1)).toEqual(result11);
  });
  test('CRUD', () => {
    const json1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
    const json2 = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');
    const result12 = fs.readFileSync(getFixturePath('result12.txt'), 'utf-8');
    expect(generateDiff(json1, json2)).toEqual(result12);
  });
  test('empty->not empty', () => {
    const json0 = fs.readFileSync(getFixturePath('file0.json'), 'utf-8');
    const json1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
    const result01 = fs.readFileSync(getFixturePath('result01.txt'), 'utf-8');
    expect(generateDiff(json0, json1)).toEqual(result01);
  });
  test('not empty -> empty', () => {
    const json0 = fs.readFileSync(getFixturePath('file0.json'), 'utf-8');
    const json1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
    const result10 = fs.readFileSync(getFixturePath('result10.txt'), 'utf-8');
    expect(generateDiff(json1, json0)).toEqual(result10);
  });
});
