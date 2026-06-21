/**
 * String-like wrapper emitted by graphql-codegen's `documentMode: 'string'`.
 *
 * It subclasses `String` so a generated operation can be passed straight to
 * `@octokit/graphql` (which expects a query string), while keeping the
 * generated code free of any runtime dependency on `graphql` / `graphql-tag`.
 *
 * The generic parameters are unused at runtime; result/variable types are
 * applied explicitly at the call site via `graphql<Result>(doc, variables)`.
 */
export class TypedDocumentString<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TResult = unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TVariables = unknown,
> extends String {
  constructor(
    value: string,
    public meta?: Record<string, unknown>
  ) {
    super(value)
  }
}
