import { Serach } from "./components/Serach";

import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { store } from "./store";
import { BookListing } from "./components/BookListing";
import MainRoutes from "./router/MainRoutes";

// process.env.REACT_APP_API_BASE_URL
function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_BASE_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
