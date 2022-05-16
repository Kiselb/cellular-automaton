const isProd = process.env.NODE_ENV === "production";

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  assetPrefix: "https://kiselb.github.io/cellular-automaton/",
};
