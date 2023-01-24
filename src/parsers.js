import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format of input file: '${format}'.`);
  }
};

export default parse;
