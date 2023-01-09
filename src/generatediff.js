import _ from 'lodash';

const generateDiff = (json1, json2) => {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  const diffs = [];
  keys.forEach((key) => {
    const val1 = _.get(obj1, key);
    const val2 = _.get(obj2, key);
    let line;
    let line2;
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (val1 === val2) {
        line = `    ${key}: ${val1}`;
      } else {
        line = `  - ${key}: ${val1}`;
        line2 = `  + ${key}: ${val2}`;
      }
    } else if (_.has(obj1, key)) {
      line = `  - ${key}: ${val1}`;
    } else {
      line = `  + ${key}: ${val2}`;
    }
    diffs.push(line);
    if (line2) {
      diffs.push(line2);
    }
  });
  const output = `{\n${diffs.join('\n')}\n}`;
  return output;
};

export default generateDiff;
