module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      'noUnusedLocals': false,
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
