import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql.schema.json',
  documents: ['./src/graphql/**/!(*.generated).graphql'],
  generates: {
    './src/graphql/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: './globals.ts',
      },
      plugins: [
        'typescript-operations',
        'typescript-document-nodes',
        {
          add: {
            content: [
              '/* eslint-disable */',
              // `documentMode: 'string'` emits `new TypedDocumentString(...)`;
              // provide the class from a local helper (no graphql runtime dep).
              "import { TypedDocumentString } from '../TypedDocumentString'",
            ],
          },
        },
      ],
      config: {
        scalars: {
          // date: 'string',
          // uuid: 'string',
          // bigint: 'number',
          // numeric: 'number',
          DateTime: 'string',
          URI: 'string',
        },
        // Emit operations/fragments as plain strings so they can be passed
        // directly to @octokit/graphql (no graphql/graphql-tag runtime dep).
        documentMode: 'string',
        extensionsType: 'unknown',
        exportFragmentSpreadSubTypes: true,
        omitOperationSuffix: true,
        skipTypeNameForRoot: true,
        dedupeFragments: true,
      },
      hooks: {
        afterOneFileWrite: ['yarn dlx prettier --write'],
      },
    },
    './src/graphql/globals.ts': {
      plugins: [
        'typescript',
        {
          add: {
            content: ['/* eslint-disable */'],
          },
        },
      ],
      config: {
        onlyOperationTypes: true,
        enumsAsTypes: true,
        scalars: {
          // date: 'string',
          // uuid: 'string',
        },
      },
      hooks: {
        afterOneFileWrite: ['yarn dlx prettier --write'],
      },
    },
  },
}

export default config
