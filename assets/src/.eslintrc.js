module.exports = {
    "extends":  ['../../.eslintrc.js', "airbnb"],
    env: {
      "browser": true,
      "node": true,
      "es6": true,
    },
    
    "parser": "babel-eslint",
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        arrowFunctions: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      "strict": 0,
      "react/prefer-es6-class": 0,
      "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
      "arrow-body-style": ["error", "always"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "linebreak-style": 0,
      "rest-spread-spacing": ["error", "never"],
      "no-console": "off",
      "jsx-a11y/label-has-for": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "template-curly-spacing" : "off",
      "indent" : "off",


      "react/prop-types": [0, { ignore: 0, customValidators: 0}],
      "react/destructuring-assignment": [0, 'always'],
      "import/no-extraneous-dependencies": ["error",  {"devDependencies": true}],
      "react/jsx-props-no-spreading": "off",
      "jsx-a11y/anchor-is-valid": 0,
      "import/no-cycle":"off"
      
  
    },
  };
  