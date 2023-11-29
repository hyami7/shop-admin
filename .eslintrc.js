module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    defineEmits: "readonly",
    defineProps: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "standard",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    semi: "off",
    quotes: "off",
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "space-before-function-paren": "off",
    "comma-dangle": "off",
    "prefer-const": "off",
  },
  overrides: [
    {
      files: ["src/api/**/*.ts"],
      rules: {
        camelcase: "off",
      },
    },
  ],
};
