Renovate / Dependabot の依存更新 PR をレビューする際、コード生成に関わるパッケージ（graphql-codegen 等）は changelog を読むだけで済ませず、以下を実施すること。

- ローカルで実際にコード生成（`yarn workspace site-api-github run graphql:codegen`）を実行し、生成コードの差分有無を確認する。
- introspection schema の更新（`graphql:schema` → `graphql.schema.json` の再生成と、それに伴う `globals.ts` の再生成）も同じ PR に追加コミットとして含める。上流 GitHub API スキーマのドリフトが混ざるが、それも含めて追随する。
