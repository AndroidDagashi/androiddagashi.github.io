import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `bearer ${process.env.GH_READONLY_TOKEN}`,
          'User-Agent': 'AndroidDagashi App',
        },
      },
    },
  ],
  documents: './src/graphql/**/*.graphql',
  generates: {
    './graphql.schema.json': {
      plugins: ['introspection'],
      hooks: {
        afterOneFileWrite: ['yarn dlx prettier --write'],
      },
    },
  },
}

export default config
