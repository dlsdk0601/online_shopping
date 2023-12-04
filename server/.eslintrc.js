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
    // interface 이름 앞에 I 붙이는거 비활성화 (네이밍 컨벤션에 안맞다)
    "@typescript-eslint/interface-name-prefix": "off",
    // void 타입은 굳이 명시하지 않는다.
    "@typescript-eslint/explicit-function-return-type": "off",
    // 모듈도 void 타입은 굳이 명시하지 않는다.
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // any 사용 에러를 비활성화
    "@typescript-eslint/no-explicit-any": "off",
    // 더블 쿼터 사용 (js)
    "quotes": [
      "error",
      "double",
      {
        // 중첩 사용시 싱글 쿼터 사용 허가
        avoidEscape: true,
      },
    ],
    // 더블 쿼터 사용 (ts)
    "@typescript-eslint/quotes": ["error", "double"],
    // mac 과 window 혼용 사용시 build 중 에러 방지를 위해 비활성화
    // endOfLine \n (o) \r\n (x)
    "linebreak-style": 0,
    // 사용안한 변수 경고 x (js)
    "no-unused-vars": 0,
    // 사용안한 변수는 경고 (ts)
    "@typescript-eslint/no-unused-vars": "warn",
    // js, ts 의 확장자는 생략
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    // 줄 띄우기
    "no-multiple-empty-lines": [
      "error",
      {
        max: 2,
        maxBOF: 1,
      },
    ],
    // 인라인 화살표 함수로 return 사용 활성화
    "arrow-body-style": 0,
    // 마지막에 , 을 넣어준다.
    "comma-dangle": 1,
    // 직관성에 영향을 주는 의미 있는 줄바꿈은 권장한다.
    "no-trailing-spaces": 0,
    // 상황에 따라 한 줄, 여러 줄을 선택한다. (비활성화 해야 빈 객체가 직관적임)
    "object-curly-newline": 0,
    // operator 가 포함 된 멀티 라인 대응
    "operator-linebreak": 0,
    // export default 사용 권장을 비활성화
    "import/prefer-default-export": 0,
    // 상황에 따라 arrow function 은 줄을 바꿀 수 있게 한다.
    "implicit-arrow-linebreak": 0,
    // 첫 글자를 _로 시작할 수 있게 한다.
    "no-underscore-dangle": 0,
    // 명시적인 type 을 리턴해주기 위해서
    "consistent-return": 0,
    // 파일 내 중복 이름 가능
    "no-shadow": 0,
    // 지역적 require 활성화
    "global-require": 0,
    // 객체 [" "] 접근 허용
    "dot-notation": 0,
    // 파일 당 max classes 횟수 제한 비활성화
    "max-classes-per-file": 0,
    // class methods에서 this 사용 강제 비활성화
    "class-methods-use-this": 0,
    // global 변수 (window, location) 참조 허용
    "no-restricted-globals": 0,
    // 파라미터 무조건 줄바꿈 비활성화
    "function-paren-newline": 0,
    // class 안에 property 및 method 간 무조건적인 공백 비활성화
    "lines-between-class-members": 0,
    // req {} 사용을 위해
    "no-empty-pattern": 0,
    // arrow function 에서 할당 반환 가능하게
    "no-return-assign": 0,
    // a++, a-- 활성화
    "no-plusplus": 0,
    // 배열 구조분해 할당 필수 비활성화
    "prefer-destructuring": 0,
    // if 문에서 크기 비교는 항상 > 으로 하기로 한다.
    "yoda": 0,
    // function 앞에서 공간 넣기 활성화
    "space-before-function-paren": 0,
    // 선언 보다 먼저 사용 가능
    "no-use-before-define": 0,
    // db column 은 스네이크 케이스를 사용하기 위해 비활성화
    "camelcase": 0,
    // for 에서 continue 사용 허가
    "no-continue": 0,
    // then 에서 무조건 catch 사용 비활성화
    "@typescript-eslint/no-floating-promises": 0,
    // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    "import/no-extraneous-dependencies": 0,
    // 빈 함수 사용 허용
    "@typescript-eslint/no-empty-function": 0,
    // 모듈 생성을 위해 any, unknow, never type 도 사용할 수 있게 한다.
    "@typescript-eslint/no-unsafe-call": 0,
    // 모듈 생성을 위해 any type 도 사용할 수 있게 한다.
    "@typescript-eslint/no-unsafe-member-access": 0,
    // 모듈 생성을 위해 any type 도 사용할 수 있게 한다.
    "@typescript-eslint/no-unsafe-assignment": 0,
    // constructor 를 사용하지 않는 class 도 있어서 비활성화 한다.
    "no-useless-constructor": 0,
    // 활성화 하는게 맞으나, seed 를 위해 비활성화 한다.
    "no-await-in-loop": 0,
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
