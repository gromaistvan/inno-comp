module.exports = {
  'plugins': ['jasmine'],
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
    'jasmine': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
