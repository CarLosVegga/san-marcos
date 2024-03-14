import { Card } from "../../Card/Card";
import { Header } from "../../Header/Header";
import { cardInformation } from "./constants";
import "./Home.css";

export const Home = () => {
	const halfIndex = Math.floor(cardInformation.length / 2);

	const firstHalfCards = cardInformation.slice(0, halfIndex);
	const secondHalfCards = cardInformation.slice(halfIndex);

	return (
		<div className="Home">
			<Header />

			<div className="menu">
				<div className="first-row">
					{firstHalfCards.map(({ cardTitle, cardSubtitle, path }) => (
						<Card
							key={cardTitle}
							title={cardTitle}
							subtitle={cardSubtitle}
							path={path}
							hasExternalLink={false}
						/>
					))}
				</div>

				<div className="second-row">
					{secondHalfCards.map(
						({ cardTitle, cardSubtitle, path }) => (
							<Card
								key={cardTitle}
								title={cardTitle}
								subtitle={cardSubtitle}
								path={path}
								hasExternalLink={cardTitle === "Gráficos"}
							/>
						)
					)}
				</div>
			</div>
		</div>
	);
};
