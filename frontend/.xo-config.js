module.exports = {
  extends: ["xo-react"],
  rules: {
    // コンポーネントのファイル名はPascalCase、hooksのファイル名はcamelCaseを使いたいので有効にしておく
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          pascalCase: true,
          camelCase: true,
        },
      },
    ],
    // Props で宣言できるように
    'unicorn/prevent-abbreviations': 'off',
    // import 文に拡張子つけない
    'n/file-extension-in-import': 'off',
    // import文で拡張子チェックはいらない
    'import/extensions': 'off',
    // React 17以降はJSXの対応済みのための'React'のimportはいらない
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    // 以下 好み
    // 関数の引数は2つまで。3以上だとオブジェクトにしてまとめる
    'max-params': ['error', 2],
  },
  // 以下 好み
  // 末尾にセミコロンはつけない
  semicolon: true,
  // prettierを有効にする
  prettier: true,
  space: 2
}
