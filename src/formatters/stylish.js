import _ from 'lodash';

const getPrefixes = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const prefix = replacer.repeat(spacesCount * (depth + 1) - 2);
  const bracePrefix = replacer.repeat(spacesCount * depth);
  return { prefix, bracePrefix };
};

const stylish = (data, depth = 0) => {
  if (data === undefined || data === null || typeof data !== 'object') {
    return String(data);
  }
  const { prefix, bracePrefix } = getPrefixes(depth);
  const currentDepth = depth + 1;
  if (Array.isArray(data)) {
    const lines = data.flatMap(({
      key, val, oldVal, operation, nodeType, children,
    }) => {
      const valStr = (nodeType === 'branch') ? stylish(children, currentDepth) : stylish(val, currentDepth);
      switch (operation) {
        case 'update': {
          const oldValStr = stylish(oldVal, currentDepth);
          return [`${prefix}- ${key}: ${oldValStr}`, `${prefix}+ ${key}: ${valStr}`];
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
  }
  const keys = _.sortBy(_.keys(data));
  const lines = keys.map((key) => `${prefix}  ${key}: ${stylish(data[key], currentDepth)}`);
  return ['{', ...lines, `${bracePrefix}}`].join('\n');
};

export default stylish;
