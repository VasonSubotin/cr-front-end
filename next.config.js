const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withSourceMaps = require("@zeit/next-source-maps");
const withFonts = require("next-fonts");

const nextConfig = {
  webpack: (config) => {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries["main.js"]) {
        entries["main.js"].unshift("./polyfills.js");
      }
      return entries;
    };

    config.module.rules = [
      ...config.module.rules,
      ...[
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                fallback: "file-loader",
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader",
        },
      ],
    ];

    return config;
  },

  env: {
    IS_DEV: process.env.NODE_ENV === "development",
  },
};

const bundleAnalyzerOptions = {
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "./bundle-analyze/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "./bundle-analyze/client.html",
    },
  },
};

const fontsOptions = {
  enableSvg: true,
};

module.exports = withPlugins(
  [[withBundleAnalyzer, bundleAnalyzerOptions], [withSourceMaps], [withFonts, fontsOptions]],
  nextConfig,
);
