import stylish from './stylish.js';
import plain from './plain.js';

const formatDiff = (data, formatter = 'stylish') => {
  let format;
  if (formatter === 'stylish') {
    format = stylish;
  } else if (formatter === 'plain') {
    format = plain;
  } else {
    throw new Error(`Unknown formatDiff formatter: '${formatter}'.`);
  }
  return format(data);
};

export default formatDiff;
