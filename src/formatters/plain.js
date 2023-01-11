import _ from 'lodash';

const stringifyValue = (val) => {
  let valStr;
  if (_.isObject(val)) {
    valStr = '[complex value]';
  } else if (_.isString(val)) {
    valStr = `'${val}'`;
  } else {
    valStr = String(val);
  }
  return valStr;
};

const plain = (data, path = []) => {
  const lines = data.flatMap(({
    key, val, oldVal, operation, nodeType,
  }) => {
    let result;
    const keyStr = [...path, key].join('.');
    const valStr = stringifyValue(val);
    if (operation === 'update') {
      const oldValStr = stringifyValue(oldVal);
      result = `Property '${keyStr}' was updated. From ${oldValStr} to ${valStr}`;
    } else if (operation === 'add') {
      result = `Property '${keyStr}' was added with value: ${valStr}`;
    } else if (operation === 'delete') {
      result = `Property '${keyStr}' was removed`;
    } else if (operation === 'nochange') {
      result = (nodeType === 'branch') ? plain(val, [...path, key]) : [];
    }
    return result;
  });
  return lines.join('\n');
};

export default plain;
