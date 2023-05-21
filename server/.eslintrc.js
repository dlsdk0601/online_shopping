module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "prettier",
  ],
  root: true,
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-return": 0,
    "quotes": [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/quotes": ["error", "double"],
    "linebreak-style": 0,
    // endOfLine \n (o) \r\n (x)
    "no-unused-vars": 0,
    // 사용안한 변수 경고 x
    "@typescript-eslint/no-unused-vars": "warn",
    // 사용안한 변수는 경고
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 2,
        maxBOF: 1,
      },
    ],
    "arrow-body-style": 0,
    // 화살표 함수 안에 return 사용 활성화
    "comma-dangle": 1,
    // 마지막에 , 을 넣어준다.
    "no-trailing-spaces": 0,
    // 직관성에 영향을 주는 의미 있는 줄바꿈은 권장한다.
    "object-curly-newline": 0,
    // 상황에 따라 한 줄, 여러 줄을 선택한다.
    "operator-linebreak": 0,
    // operator 가 포함 된 멀티 라인 대응
    "import/prefer-default-export": 0,
    // 개인 취향
    "implicit-arrow-linebreak": 0,
    // 상황에 따라 arrow function 은 줄을 바꿀 수 있게 한다.
    "no-underscore-dangle": 0,
    // convention 상 첫 글자를 _로 시작할 수 있게 한다.
    "consistent-return": 0,
    // undefined 를 명시적으로 리턴해주기 위해서
    "no-shadow": 0,
    // 파일 내 중복 이름 가능
    "global-require": 0,
    // 지역적 require 활성화
    "dot-notation": 0,
    // 객체 [" "] 접근 허용
    "max-classes-per-file": 0,
    // 파일 당 max classes 횟수 제한 x
    "class-methods-use-this": 0,
    // class methods에서 this 사용 강제 x
    "no-restricted-globals": 0,
    "function-paren-newline": 0,
    // static-element에 event 달 수 있게
    "lines-between-class-members": 0,
    // req {} 사용을 위해
    "no-empty-pattern": 0,
    // arrow function에서 할당 반환 가능하게
    "no-return-assign": 0,
    // a++, a-- 가능하게 변경 (요청 사항)
    "no-plusplus": 0,
    // 19자 이후 >(closing-tag) 허용......
    // 배열 구조분해 할당 필수 제거
    "prefer-destructuring": 0,
    // if문에서 크기 비교는 항상 > 으로 하기로 한다.
    "yoda": 0,
    // function 앞에서 공간 넣기 O
    "space-before-function-paren": 0,
    // 선언 보다 먼저 사용 가능
    "no-use-before-define": 0,
    "camelcase": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "no-useless-constructor": 0,
    "no-nested-ternary": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        path: ["src"],
        extensions: [".js", ".ts", ".d.ts"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "eslint.workingDirectories": [
      {
        mode: "auto",
      },
    ],
  },
};
