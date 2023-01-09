import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import * as fs from 'node:fs';
import generateDiff from '../src/generatediff.js';

let currentDirname;
beforeAll(() => {
  const filename = fileURLToPath(import.meta.url);
  currentDirname = dirname(filename);
});

const getFixturePath = (filename) => join(currentDirname, '..', '__fixtures__', filename);

describe('generateDiff - flat .json files compare', () => {
  test('no diff', () => {
    const filepath1 = getFixturePath('file1.json');
    const result11 = fs.readFileSync(getFixturePath('result11.txt'), 'utf-8');
    expect(generateDiff(filepath1, filepath1)).toEqual(result11);
  });
  test('CRUD', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result12 = fs.readFileSync(getFixturePath('result12.txt'), 'utf-8');
    expect(generateDiff(filepath1, filepath2)).toEqual(result12);
  });
  test('empty->not empty', () => {
    const filepath0 = getFixturePath('file0.json');
    const filepath1 = getFixturePath('file1.json');
    const result01 = fs.readFileSync(getFixturePath('result01.txt'), 'utf-8');
    expect(generateDiff(filepath0, filepath1)).toEqual(result01);
  });
  test('not empty -> empty', () => {
    const filepath0 = getFixturePath('file0.json');
    const filepath1 = getFixturePath('file1.json');
    const result10 = fs.readFileSync(getFixturePath('result10.txt'), 'utf-8');
    expect(generateDiff(filepath1, filepath0)).toEqual(result10);
  });
});

describe('generateDiff - flat .yaml files compare', () => {
  test('no diff', () => {
    const filepath1 = getFixturePath('file1.yml');
    const result11 = fs.readFileSync(getFixturePath('result11.txt'), 'utf-8');
    expect(generateDiff(filepath1, filepath1)).toEqual(result11);
  });
  test('CRUD', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const result12 = fs.readFileSync(getFixturePath('result12.txt'), 'utf-8');
    expect(generateDiff(filepath1, filepath2)).toEqual(result12);
  });
  test('empty->not empty', () => {
    const filepath0 = getFixturePath('file0.yml');
    const filepath1 = getFixturePath('file1.yml');
    const result01 = fs.readFileSync(getFixturePath('result01.txt'), 'utf-8');
    expect(generateDiff(filepath0, filepath1)).toEqual(result01);
  });
  test('not empty -> empty', () => {
    const filepath0 = getFixturePath('file0.yml');
    const filepath1 = getFixturePath('file1.yml');
    const result10 = fs.readFileSync(getFixturePath('result10.txt'), 'utf-8');
    expect(generateDiff(filepath1, filepath0)).toEqual(result10);
  });
});
