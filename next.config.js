const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withSourceMaps = require("@zeit/next-source-maps");
const withFonts = require("next-fonts");

const getEnvVar = (key, defaultValue) => process.env[key] || defaultValue;

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
    STRIPE_KEY: getEnvVar("STRIPE_KEY", "pk_live_HMqWrucVGJENh0pvC2RMDZEs00EYALYEve"),
    SLACK_WEBHOOK_URL: getEnvVar(
      "SLACK_WEBHOOK_URL",
      "https://hooks.slack.com/services/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",
    ),
    CRYPTO_SECRET_KEY: getEnvVar("CRYPTO_SECRET_KEY", "some_encryption_key"),
    SHEETY_API_URL: getEnvVar(
      "SHEETY_API_URL",
      "https://v2-api.sheety.co/4a6538176d4760920ab65f88623d773e/vdBackendV2/",
    ),
    SHEETY_API_MACHINES_TABLE_NAME: getEnvVar("SHEETY_API_MACHINES_TABLE_NAME", "sheet1"),
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
