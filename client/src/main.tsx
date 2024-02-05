import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "App";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "theme/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>
);
