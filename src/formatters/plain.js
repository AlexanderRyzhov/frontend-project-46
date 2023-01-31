import _ from 'lodash';

const stringifyValue = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  return (_.isString(val)) ? `'${val}'` : String(val);
};

const plain = (data, path = []) => {
  const formatLine = ({
    key, val, oldVal, nodeType, children,
  }) => {
    const keyStr = [...path, key].join('.');
    const valStr = stringifyValue(val);
    switch (nodeType) {
      case 'complex':
        return plain(children, [...path, key]);
      case 'update': {
        const oldValStr = stringifyValue(oldVal);
        return `Property '${keyStr}' was updated. From ${oldValStr} to ${valStr}`;
      }
      case 'add':
        return `Property '${keyStr}' was added with value: ${valStr}`;
      case 'delete':
        return `Property '${keyStr}' was removed`;
      case 'nochange':
        return [];
      default:
        throw new Error(`Unknown nodeType: '${nodeType}'.`);
    }
  };
  const lines = data.flatMap(formatLine);
  return lines.join('\n');
};

export default plain;
