import _ from 'lodash';

const stylish = (data) => {
  const replacer = ' ';
  const spacesCount = 4;
  const iter = (value, depth) => {
    if (value === undefined) {
      return 'undefined';
    }
    if (value === null) {
      return 'null';
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        const currentDepth = depth + 1;
        const prefix = replacer.repeat(spacesCount * (currentDepth) - 2);
        const bracePrefix = replacer.repeat(spacesCount * (depth));
        const keys = _.sortBy(_.keys(value));
        const lines = keys.map((key) => `${prefix}  ${key}: ${iter(value[key], currentDepth)}`);
        const output = ['{', ...lines, `${bracePrefix}}`].join('\n');
        return output;
      }
      return value.toString();
    }
    const currentDepth = depth + 1;
    const prefix = replacer.repeat(spacesCount * (currentDepth) - 2);
    const bracePrefix = replacer.repeat(spacesCount * (depth));
    const lines = value.flatMap(({
      key, val, oldVal, nodeType, operation,
    }) => {
      const valStr = iter(val, currentDepth);
      let result = [];
      if (nodeType === 'branch') {
        if (operation === 'nochange') {
          result = `${prefix}  ${key}: ${iter(val, currentDepth)}`;
        } else if (operation === 'add') {
          result = `${prefix}+ ${key}: ${iter(val, currentDepth)}`;
        } else if (operation === 'delete') {
          result = `${prefix}- ${key}: ${iter(val, currentDepth)}`;
        }
      } else if (nodeType === 'leaf') {
        if (operation === 'update') {
          const oldValStr = iter(oldVal, currentDepth);
          result = [
            `${prefix}- ${key}: ${oldValStr}`,
            `${prefix}+ ${key}: ${valStr}`,
          ];
        } else if (operation === 'add') {
          result = `${prefix}+ ${key}: ${valStr}`;
        } else if (operation === 'delete') {
          result = `${prefix}- ${key}: ${valStr}`;
        } else if (operation === 'nochange') {
          result = `${prefix}  ${key}: ${valStr}`;
        }
      }

      return result;
    });
    const output = ['{', ...lines, `${bracePrefix}}`].join('\n');
    return output;
  };
  return iter(data, 0);
};

const formatDiff = (data, formatter = 'stylish') => {
  let format;
  if (formatter === 'stylish') {
    format = stylish;
  }
  return format(data);
};

export default formatDiff;
