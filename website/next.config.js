// require('dotenv').config()
const {
  MICROCMS_API_KAY
} = process.env

module.exports = {
  env: {
    MICROCMS_API_KAY
  },
  trailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }
}
