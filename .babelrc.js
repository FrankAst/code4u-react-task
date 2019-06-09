/* eslint-disable prefer-template */

const path = require('path');
const fs = require('fs');

const plugins = [
  require.resolve('@babel/plugin-transform-flow-strip-types'),
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [path.resolve('./')],
    },
  ],
  [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
  require.resolve('@babel/plugin-proposal-object-rest-spread'),
  require.resolve('@babel/plugin-syntax-dynamic-import'),
  [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose: false }],
  require.resolve('@babel/plugin-proposal-export-namespace-from'),
  require.resolve('@babel/plugin-transform-react-jsx-source'),
  require.resolve('@babel/plugin-transform-react-jsx-self'),
];

const presets = [
  require.resolve('@babel/preset-flow'),
  require.resolve('@babel/preset-react'),
  [
    require.resolve('@babel/preset-env'),
    {
      targets: {
        node: 'current',
      },
      useBuiltIns: false,
    },
  ]
];


module.exports = {
  presets: [...presets],
  plugins: [...plugins],
};
