import React from "react"; 
import ReactDOM from "react-dom/client"; 
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; 
import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client"; 

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
