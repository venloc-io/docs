module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  env: {
    es6: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "prettier",
  ],

  rules: {
    "prettier/prettier": "warn",

    "import/order": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",

    "@typescript-eslint/no-redeclare": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-dupe-class-members": ["error"],
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/lines-between-class-members": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-module-boundary-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-inferrable-types": "off",

    "no-continue": "off",
    "no-alert": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-redeclare": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-dupe-class-members": "off",
    "no-return-assign": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",

    "curly": ["error", "all"],
    "newline-after-var": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],
    "padded-blocks": "off",
    "class-methods-use-this": "off",
    "global-require": "off",
    "func-names": ["error", "never"],
    "arrow-body-style": "off",
    "max-len": "off",
    "consistent-return": "off",
    "prefer-destructuring": "off",
    "lines-between-class-members": "off",
  },
};
