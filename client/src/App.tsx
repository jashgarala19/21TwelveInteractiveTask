import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "routes/routes";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "theme/theme";
import AuthProvider from "context/AuthProvider";
import { store } from "app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
