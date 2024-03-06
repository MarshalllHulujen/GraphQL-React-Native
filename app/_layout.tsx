import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Slot } from "expo-router";
import { View } from "react-native";
export default function RootLayoutNav() {
  const client = new ApolloClient({
    uri: "https://nextjs-graphql-chi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
        <Slot />
      </View>
    </ApolloProvider>
  );
}
