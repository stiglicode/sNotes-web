module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/assets/styles/core/_colors.scss";
        `,
      },
    },
  },
};
