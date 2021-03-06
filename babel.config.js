module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          tests: ["./tests/"],
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@routes": "./src/routes",
          "@utils": "./src/utils",
          "@pages": "./src/pages",
          "@models": "./src/models",
          "@hooks": "./src/hooks",
          "@layouts": "./src/layouts",
        },
      },
    ],
  ],
};
