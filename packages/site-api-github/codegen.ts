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
        'typescript-graphql-request',
        {
          add: {
            content: [
              '/* eslint-disable */',
              // https://github.com/dotansimha/graphql-code-generator-community/issues/458
              `import type { GraphQLError } from 'graphql'`,
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
        withHooks: true,
        rawRequest: true,
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
