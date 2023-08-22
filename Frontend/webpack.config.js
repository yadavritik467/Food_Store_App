const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace this with the entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Replace 'dist' with the output directory of your choice
    filename: 'bundle.js', // Replace 'bundle.js' with the desired output file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // Exclude node_modules from Babel transpilation
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add '.jsx' to the list of extensions to resolve
  },
};
