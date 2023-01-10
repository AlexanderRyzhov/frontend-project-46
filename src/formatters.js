import _ from 'lodash';

const stylish = (data, depth = 0) => {
  const replacer = ' ';
  const spacesCount = 4;
  if (data === undefined) {
    return 'undefined';
  }
  if (data === null) {
    return 'null';
  }
  const currentDepth = depth + 1;
  const prefix = replacer.repeat(spacesCount * currentDepth - 2);
  const bracePrefix = replacer.repeat(spacesCount * depth);
  if (!Array.isArray(data)) {
    if (typeof data === 'object') {
      const keys = _.sortBy(_.keys(data));
      const lines = keys.map((key) => `${prefix}  ${key}: ${stylish(data[key], currentDepth)}`);
      return ['{', ...lines, `${bracePrefix}}`].join('\n');
    }
    return data.toString();
  }

  const lines = data.flatMap(({
    key, val, oldVal, operation,
  }) => {
    let result = [];
    const valStr = stylish(val, currentDepth);
    if (operation === 'update') {
      const oldValStr = stylish(oldVal, currentDepth);
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
    return result;
  });
  return ['{', ...lines, `${bracePrefix}}`].join('\n');
};

const formatDiff = (data, formatter = 'stylish') => {
  let format;
  if (formatter === 'stylish') {
    format = stylish;
  }
  return format(data);
};

export default formatDiff;
