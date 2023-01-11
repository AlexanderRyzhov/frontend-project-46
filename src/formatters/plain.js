import _ from 'lodash';

const stringifyValue = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  return (_.isString(val)) ? `'${val}'` : String(val);
};

const plain = (data, path = []) => {
  const lines = data.flatMap(({
    key, val, oldVal, operation, nodeType, children,
  }) => {
    const keyStr = [...path, key].join('.');
    const valStr = stringifyValue(val);
    if (operation === 'update') {
      const oldValStr = stringifyValue(oldVal);
      return `Property '${keyStr}' was updated. From ${oldValStr} to ${valStr}`;
    }
    if (operation === 'add') {
      return `Property '${keyStr}' was added with value: ${valStr}`;
    }
    if (operation === 'delete') {
      return `Property '${keyStr}' was removed`;
    }
    if (operation === 'nochange') {
      return (nodeType === 'branch') ? plain(children, [...path, key]) : [];
    }
    throw new Error(`Unknown operation: '${operation}'.`);
  });
  return lines.join('\n');
};

export default plain;
