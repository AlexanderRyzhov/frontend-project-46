import _ from 'lodash';

const generateDiff = (json1, json2) => {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  const diffs = [];
  keys.forEach((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const val1 = _.get(obj1, key);
      const val2 = _.get(obj2, key);
      if (val1 === val2) {
        const line = `    ${key}: ${val1}`;
        diffs.push(line);
      } else {
        const line1 = `  - ${key}: ${val1}`;
        const line2 = `  + ${key}: ${val2}`;
        diffs.push(line1);
        diffs.push(line2);
      }
    } else if (_.has(obj1, key)) {
      const val1 = _.get(obj1, key);
      const line = `  - ${key}: ${val1}`;
      diffs.push(line);
    } else {
      const val2 = _.get(obj2, key);
      const line = `  + ${key}: ${val2}`;
      diffs.push(line);
    }
  });
  const output = `{\n${diffs.join('\n')}\n}`;
  return output;
};

export default generateDiff;
