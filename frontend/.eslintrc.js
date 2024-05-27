module.exports = {
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "react/no-unescaped-entities": 0,
    "react/jsx-curly-brace-presence": "error",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    // "react/jsx-no-bind": "warn",
  },
};
