import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const httpLink = new HttpLink({ uri:'https://api.github.com/graphql' });

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    const token = `${ctx.env.GHRT_A}${ctx.env.GHRT_B}`;

    console.log("token", token)
    operation.setContext({
      headers: { authorization: `Bearer ${token}` }
    });

    if (forward) {
      return forward(operation);
    } else {
      return null;
    }
  })
  const link = middlewareLink.concat(httpLink);
  return {
    link,
    cache: new InMemoryCache()
  };
}
