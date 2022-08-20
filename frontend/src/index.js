import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/system";
import { useTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const RootElement = () => {
	const theme = useTheme();
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RootElement />
	</React.StrictMode>
);
