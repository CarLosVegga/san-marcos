import { useLocation, useNavigate } from "react-router-dom";
import { HEADER_INFORMATION } from "./constants";
import imgLogo from "./Logo.png";
import "./Header.css";

// Function to get the header info
const getHeaderMessages = (
	pathname: string | undefined
): { title: string; subtitle: string } => {
	if (pathname && pathname in HEADER_INFORMATION) {
		return HEADER_INFORMATION[pathname];
	}
	return HEADER_INFORMATION["error"];
};

export const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	const { title, subtitle } = getHeaderMessages(pathname);

	return (
		<header>
			<img src={imgLogo} onClick={() => navigate("/")} />
			<div className="header-info">
				<h1>{title}</h1>
				<h2>{subtitle}</h2>
			</div>
		</header>
	);
};
