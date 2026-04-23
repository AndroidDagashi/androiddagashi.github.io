# ESLint v10 本質的移行プラン（PR #606 を mergeable にする）

## Context

Renovate PR [#606](https://github.com/AndroidDagashi/androiddagashi.github.io/pull/606) は `eslint` を `9.39.4 → 10.2.1` にバンプするが、これ単体では以下の理由で本質的に壊れている:

1. **peer dependency 不整合**: 現在使用中の `@nuxt/eslint@1.12.1` の peer は `eslint: "^9.0.0"` のみ（@nuxt/eslint が eslint v10 を受け入れたのは v1.15.0 以降）。`yarn install` は通っても、v10 での動作は保証されず、将来 peer の strict 化で破綻する。
2. **CI は build のみで lint を実行していない**（`.github/workflows/build.yml` は `nuxi build` のみ）。現在 PR が "CLEAN" に見えるのは、単に `nuxi build` に ESLint が介在しないだけ。`yarn site:lint` は検証されていない。
3. **レガシー eslintrc が同居**: `/.eslintrc.js`、`/packages/site/.eslintrc.js`、`/.eslintignore` が残存。ESLint v10 は `.eslintrc.*` / `.eslintignore` を完全に無視するので実害は薄いが、`/* eslint-env node */` の残置も含めコンフィグの**意図と実態の乖離**を生む。本質的移行として撤去すべき。
4. **`eslint:recommended` に新ルール 3 件**: `no-unassigned-vars` / `no-useless-assignment` / `preserve-caught-error`。既存コードが引っ掛かる可能性がある。
5. **`no-shadow-restricted-names`** が `globalThis` シャドウもデフォルトで検知するようになった。

これらを workaround（peer ignore、ピン止め、rule off など）ではなく**本筋で解消**することで、PR #606 を安全に merge できる状態にする。

## 現状調査サマリ

- **Node.js**: `mise.toml` → `24.14.0`。ESLint v10 要件 (`^20.19 || ^22.13 || ^24`) を満たす ✓
- **ESLint 利用範囲**:
  - lint スクリプトは `packages/site` のみ (`packages/site/package.json` の `"lint": "eslint ."`)
  - 他パッケージ (site-api, site-rss, ...) には `package.json` すら無く lint 対象外
  - CI は build だけで lint は走っていない → **手元で `yarn site:lint` の green 化は必須**
- **設定ファイル現状**:
  - `/packages/site/eslint.config.mjs` … flat config、`@nuxt/eslint` の `withNuxt()` を利用（実質これのみ有効）
  - `/packages/site/.eslintrc.js` … 使われていないレガシー（v10 で無視されるが撤去）
  - `/.eslintrc.js` … 使われていないレガシー（`/* eslint-env node */` 付）
  - `/.eslintignore` … 使われていないレガシー
- **@nuxt/eslint**:
  - 現在 `1.12.1`（2025-12-10 リリース）→ peer `eslint: "^9.0.0"`
  - 最新 `1.15.2`（2026-02-24 リリース、7 日以上経過 ✓）→ peer `eslint: "^9.0.0 || ^10.0.0"`
  - v10 対応は `1.15.0`（#642 "Relax peer deps range to support ESLint v10"）で追加
- **`eslint-env` コメント**: `/.eslintrc.js:1` のみ。該当ファイルごと削除するので対応不要
- **Renovate PR #606 の diff**: `packages/site/package.json` の eslint バージョンと `yarn.lock` のみ

## 移行方針（本質的対応）

Renovate ブランチ `renovate/major-eslint-monorepo` に**追加コミットを積み上げる**。Renovate は rebase チェックボックスが off なので手動コミットは保持される。別 PR を立てず、単一 PR で atomic に移行する。

### 変更一覧

1. **`@nuxt/eslint` を `1.15.2` にバンプ**（最優先・ブロッカー解消）
   - ファイル: `packages/site/package.json` devDependencies
   - `1.12.1` → `1.15.2`（バージョン固定、lock 再生成）
   - 理由: eslint v10 の peerDependency 要件を満たすため。v1.15.0 以降が必須。
2. **レガシー eslint 設定ファイルの削除**
   - `/.eslintrc.js`（root、使われていない）
   - `/packages/site/.eslintrc.js`（flat config に置換済み、実質未使用）
   - `/.eslintignore`（flat config では `ignores` キーが使われるため不要）
   - 理由: v10 が `.eslintrc.*` を完全に無視するため残置は誤解の元。`eslint-env` コメントも一緒に消える。
3. **flat config の ignore 設定確認**
   - `packages/site/eslint.config.mjs` は `withNuxt()` + files/rules のみ。`@nuxt/eslint` が生成する `.nuxt/eslint.config.mjs` が `.nuxt/`, `node_modules/`, `dist/` などの無視を既定で含む想定だが、念のため確認。不足があれば `ignores` キーを追加。
4. **`yarn site:lint` を実行して green 化**
   - 新規 `eslint:recommended` ルール 3 件の違反があれば、**コード側を修正**する（ルール off は禁止）
     - `no-unassigned-vars`: 宣言のみで代入されない変数を検出 → 未使用なら削除、必要なら初期値付与
     - `no-useless-assignment`: 直後に上書きされる代入 → コード簡略化
     - `preserve-caught-error`: `catch (e)` で捕捉したエラーを再throw 時に元の error を失わない（`cause` に付ける）
   - `no-shadow-restricted-names`: `globalThis` をシャドウしている箇所があれば命名変更
   - 実行順: a) root で `yarn install` → b) `yarn site:lint` → c) エラー列を見て 1 件ずつコード修正
5. **ビルド検証**
   - `yarn api:generate`（必要なら `GH_READONLY_TOKEN` が `.envrc` に設定済み前提）
   - `yarn site:generate` が通ることを確認
6. **CI に lint を追加する（スコープ外・将来の別 PR 推奨）**
   - 本来 `build.yml` / `deploy.yml` に `yarn site:lint` を入れるべきだが、本 PR のスコープを超えるためフォローアップ issue 化を推奨。ユーザーが望めば同 PR に含める。

### 修正対象ファイル

| パス | 操作 |
|---|---|
| `packages/site/package.json` | `@nuxt/eslint` を `1.15.2` に更新（eslint `10.2.1` は Renovate が既に変更済み） |
| `yarn.lock` | `yarn install` による再生成 |
| `.eslintrc.js` | 削除 |
| `packages/site/.eslintrc.js` | 削除 |
| `.eslintignore` | 削除 |
| `packages/site/eslint.config.mjs` | 必要に応じて `ignores` 追加（要検証） |
| 任意のソース (*.ts / *.vue) | 新ルール違反があれば修正 |

### 依存ポリシー遵守

- `@nuxt/eslint`: `1.15.2`（2026-02-24 リリース、2 ヶ月経過、安定）✓
- `eslint`: `10.2.1`（既に Renovate PR で指定、リリース後十分経過）✓
- 両方ともバージョン完全固定（キャレット無し）✓
- lock ファイル更新は `yarn install` 経由で生成 ✓

## 実行手順（g / go 後）

1. ローカル branch を `renovate/major-eslint-monorepo` にチェックアウト（`git fetch origin renovate/major-eslint-monorepo && git checkout renovate/major-eslint-monorepo`）
2. `packages/site/package.json` の `@nuxt/eslint` を `1.12.1` → `1.15.2` に変更
3. `yarn install` で lock 更新
4. レガシーファイル 3 件を `git rm`
5. `yarn site:lint` を実行
6. 違反があればコードを修正（ルール無効化は避ける）。修正後 `yarn site:lint` 再実行で clean になるまでループ
7. `yarn site:generate`（もしくは最低 `yarn workspace site exec nuxi build --preset github_pages`）でビルド通過確認
8. コミット分割:
   - `chore(deps): bump @nuxt/eslint to 1.15.2 for eslint v10 support`
   - `chore(eslint): remove legacy eslintrc and .eslintignore`
   - （違反修正がある場合）`fix(lint): address new eslint v10 recommended rule violations`
9. `git push origin renovate/major-eslint-monorepo`
10. PR #606 の CI 通過確認 → merge 可能状態へ

## 検証（エンドツーエンド）

- [ ] `yarn install` がエラー・警告なく完了（peer warning が出ないこと）
- [ ] `ls .eslintrc.js packages/site/.eslintrc.js .eslintignore` → 3 件とも "No such file" になる
- [ ] `yarn site:lint` が exit code 0
- [ ] `yarn workspace site exec nuxi build --preset github_pages` 成功
- [ ] GitHub 上で PR #606 の "Build Website" check が success
- [ ] `eslint --print-config packages/site/app/app.vue | jq '.rules | keys'`（任意）で `no-unassigned-vars` 等が enabled になっていること確認

## 想定リスクと対応

- **新ルール違反が大量発生**: 違反の内容を見てからコード側で 1 件ずつ直す。どうしても直せない正当な理由がある場合のみ `eslint.config.mjs` の rules で明示的に off し、その理由をコメント記載（ただしデフォルトは修正側に倒す）。
- **`@nuxt/eslint` 1.15 系で flat config API の破壊的変更**: リリースノート上は peer の relax のみ。万一 `withNuxt` の signature 変更などがあれば `eslint.config.mjs` を追随修正。
- **Renovate が勝手に rebase**: rebase チェックは off なので追加コミットは維持される想定。万一 renovate が overwrite したら rerun。
- **他パッケージへの波及**: site-api / site-rss 等は lint していないため影響なし。

## スコープ外 / 後続タスク候補

- CI (`build.yml`, `deploy.yml`) に lint step を追加する（lint 通過を CI で保証）
- Renovate 設定に ESLint ecosystem のグルーピング見直し（eslint 本体と @nuxt/eslint を同時にまとめるルール）

## 参考資料

- [ESLint v10 migration guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0)
- [ESLint v10.0.0 released blog](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)
- [@nuxt/eslint releases](https://github.com/nuxt/eslint/releases) (v1.15.0 で eslint v10 peer 追加)
- PR #606: https://github.com/AndroidDagashi/androiddagashi.github.io/pull/606
