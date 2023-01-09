import yaml from 'js-yaml';

const parse = (data, format) => {
  let parseFunction;
  if (format === '.json') {
    parseFunction = JSON.parse;
  }
  if (format === '.yml' || format === '.yaml') {
    parseFunction = yaml.load;
  }
  return parseFunction(data);
};

export default parse;
