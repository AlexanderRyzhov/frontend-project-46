import _ from 'lodash';

const getPrefixes = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const prefix = replacer.repeat(spacesCount * (depth + 1) - 2);
  const bracePrefix = replacer.repeat(spacesCount * depth);
  return { prefix, bracePrefix };
};

const stringify = (data, depth = 0) => {
  if (_.isPlainObject(data)) {
    const { prefix, bracePrefix } = getPrefixes(depth);
    const currentDepth = depth + 1;
    const keys = _.sortBy(_.keys(data));
    const lines = keys.map((key) => `${prefix}  ${key}: ${stringify(data[key], currentDepth)}`);
    return ['{', ...lines, `${bracePrefix}}`].join('\n');
  }
  return String(data);
};

const stylish = (data, depth = 0) => {
  const { prefix, bracePrefix } = getPrefixes(depth);
  const currentDepth = depth + 1;
  const lines = data.flatMap(({
    key, val, oldVal, nodeType, children,
  }) => {
    const valStr = (nodeType === 'complex') ? stylish(children, currentDepth) : stringify(val, currentDepth);
    switch (nodeType) {
      case 'complex': {
        return `${prefix}  ${key}: ${valStr}`;
      }
      case 'update': {
        const oldValStr = stringify(oldVal, currentDepth);
        return [
          `${prefix}- ${key}: ${oldValStr}`,
          `${prefix}+ ${key}: ${valStr}`,
        ];
      }
      case 'add':
        return `${prefix}+ ${key}: ${valStr}`;
      case 'delete':
        return `${prefix}- ${key}: ${valStr}`;
      case 'nochange':
        return `${prefix}  ${key}: ${valStr}`;
      default:
        return [];
    }
  });
  return ['{', ...lines, `${bracePrefix}}`].join('\n');
};

export default stylish;
