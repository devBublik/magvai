module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|jpg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  };