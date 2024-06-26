const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@assets': 'src/assets',
    '@images': 'src/assets/images',
    '@redux': 'src/redux',
    '@modules': 'src/modules',
    '@constants': 'src/constants',
    '@utils': 'src/utils',
    '@layouts': 'src/layouts'
  })(config);

  return config;
};