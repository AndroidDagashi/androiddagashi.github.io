import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `bearer ${process.env.GH_READONLY_TOKEN}`,
        },
      },
    },
  ],
  documents: './src/graphql/**/*.graphql',
  generates: {
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
