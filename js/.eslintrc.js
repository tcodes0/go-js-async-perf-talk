module.exports = {
  // order matters here, early entries have lower priority
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.mjs'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // ##############
    // # typescript #
    // ##############
    '@typescript-eslint/quotes': ['error', 'double'],
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': false,
        minimumDescriptionLength: 10,
      },
    ],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        builtinGlobals: false,
        hoist: 'all',
        allow: [],
      },
    ],
    // unused-imports conflict
    '@typescript-eslint/naming-convention': 'off',
    // OFF
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // replaced by prettier
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/quotes': 'off',
    // easier to read sometimes, less diff churn on PR
    '@typescript-eslint/no-use-before-define': 'off',
    // code styling
    '@typescript-eslint/camelcase': 'off',
    // EXPLICIT anys are fine
    '@typescript-eslint/no-explicit-any': 'off',
    // replaced by unused-imports plugin
    '@typescript-eslint/no-unused-vars': 'off',
    // ##########
    // # eslint #
    // ##########
    'no-console': ['off'],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message:
              'Injected at buildtime, do not import. "React" is globally available for types during development',
          },
        ],
      },
    ],
    'new-cap': 'error',
    'no-empty': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'default-case': 'error',
    'global-require': 'error',
    'prefer-const': 'error',
    // OFF
    // code styling
    'comma-dangle': 'off',
    'no-confusing-arrow': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'no-else-return': 'off',
    'no-confusing-arrow': 'off',
    'no-extra-semi': 'off',
    'max-len': 'off',
    indent: 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    // see https://github.com/prettier/eslint-config-prettier#arrow-body-style-and-prefer-arrow-callback
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'padded-blocks': 'off',
    'spaced-comment': 'off',
    camelcase: 'off',
    // superseeded by @typescript-eslint/no-var-requires
    'global-require': 'off',
    // rule meant to help with types, we use ts for it
    'consistent-return': 'off',
    // var is ok
    'no-var': 'off',
    // var is ok
    // nothing wrong with continue
    'no-continue': 'off',
    // see @typescript-eslint/no-use-before-define in this file
    'no-use-before-define': 'off',
    // ############
    // # prettier #
    // ############
    'prettier/prettier': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      '@babel/eslint-parser': ['.js', '.jsx', '.mjs'],
    },
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
  env: {
    'jest/globals': true,
  },
};
