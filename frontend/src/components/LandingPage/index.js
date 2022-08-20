import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import backgroundImg from "../../assets/images/background.jpg";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const LandingPage = () => {
	return (
		<>
			<Box
				sx={{
					background: `url(${backgroundImg})`,
					backgroundSize: "cover",
					flexGrow: 1,
					padding: (theme) => theme.spacing(2),
					display: "flex",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						marginX: "auto",
						alignItems: "center",
						justifyContent: "center",
						marignTop: "auto",
						gap: (theme) => theme.spacing(2),
						backdropFilter: "blur(5px)",
						width: "100%",
					}}
				>
					<Typography color="white" variant="h2" sx={{}}>
						DINE VILLE
					</Typography>
					<Button variant="contained" endIcon={<ArrowForwardIcon />}>
						Explore
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default LandingPage;
