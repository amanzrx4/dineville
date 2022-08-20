import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
function App() {
	return (
		<>
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<Navbar />
				<Routes>
					<Route path="/" element={<LandingPage />} />
				</Routes>
				<Footer />
			</div>
		</>
	);
}

export default App;
