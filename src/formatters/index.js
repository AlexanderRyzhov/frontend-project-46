import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatDiff = (data, formatter = 'stylish') => {
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`Unknown formatDiff formatter: '${formatter}'.`);
  }
};

export default formatDiff;
