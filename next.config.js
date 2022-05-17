const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProd ? "/cellular-automaton" : "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  assetPrefix: isProd ? "/cellular-automaton/" : "",
  excludeFile: (str) => /\*.{spec,test}.(js|ts)?(x)/.test(str),
};
