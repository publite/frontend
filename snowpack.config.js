// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  plugins: ["@snowpack/plugin-typescript"],
  packageOptions: {
    polyfillNode: true,
  },
  mount: {
    public: "/",
    src: "/dist",
  },
  optimize: {
    bundle: true,
  },
  routes: [
    { match: "routes", src: "robots.txt", dest: "/robots.txt" },
    { match: "routes", src: ".*", dest: "/index.html" },
  ],
  devOptions: {
    open: "none",
  },
  alias: { "@assets": "./src/assets", "@utils": "./src/utils" },
  exclude: ["**/node_modules/**/*", "**/*.test.*"],
  env: {
    // API_URL: "https://publitebackend.dmitriy.icu",
  },
};
