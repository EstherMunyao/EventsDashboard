import { ApolloClient, InMemoryCache,HttpLink } from "@apollo/client"; 

const client = new ApolloClient({
    link: new HttpLink ({uri: ' http://localhost:5074/graphql'}),
    cache: new InMemoryCache()
});

export default client;