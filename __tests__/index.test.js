import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import * as fs from 'node:fs';
import generateDiff from '../src/generatediff.js';

const getFixturePath = (filename) => {
  const currentFilename = fileURLToPath(import.meta.url);
  const currentDirname = dirname(currentFilename);
  return join(currentDirname, '..', '__fixtures__', filename);
};

describe('generateDiff .json files compare', () => {
  test.each([
    ['no diff', 'file1.json', 'file1.json', 'result11.txt'],
    ['CRUD', 'file1.json', 'file2.json', 'result12.txt'],
    ['empty->not empty', 'file0.json', 'file1.json', 'result01.txt'],
    ['not empty -> empty', 'file1.json', 'file0.json', 'result10.txt'],
  ])('%s', (testName, file1, file2, output) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const result = fs.readFileSync(getFixturePath(output), 'utf-8');
    expect(generateDiff(filepath1, filepath2)).toEqual(result);
  });
});

describe('generateDiff .yml files compare', () => {
  test.each([
    ['no diff', 'file1.yml', 'file1.yml', 'result11.txt'],
    ['CRUD', 'file1.yml', 'file2.yml', 'result12.txt'],
    ['empty->not empty', 'file0.yml', 'file1.yml', 'result01.txt'],
    ['not empty -> empty', 'file1.yml', 'file0.yml', 'result10.txt'],
  ])('%s', (testName, file1, file2, output) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const result = fs.readFileSync(getFixturePath(output), 'utf-8');
    expect(generateDiff(filepath1, filepath2)).toEqual(result);
  });
});

describe('generateDiff - nested .json files compare, ', () => {
  test('plain output', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result12 = fs.readFileSync(getFixturePath('result12plain.txt'), 'utf-8');
    expect(generateDiff(filepath1, filepath2, 'plain')).toEqual(result12);
  });
});

describe('generateDiff - nested .json files compare, json output', () => {
  test('json output', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result12 = fs.readFileSync(getFixturePath('result12json.txt'), 'utf-8');
    const expected = JSON.parse(result12);
    const result = JSON.parse(generateDiff(filepath1, filepath2, 'json'));
    expect(result).toMatchObject(expected);
  });
});
