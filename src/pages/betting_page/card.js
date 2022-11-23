import React, { useContext } from "react";
import { LanguageContext } from "../../store/user-context";

const CardComponent = ({ current, pool, player, changeBet }) => {
	const { applanguage, setApplamguage } = useContext(LanguageContext);
	const bettors = player.bettors;
	const id = player.id;

	const calculatePoints = () => {
		if (id == current) return Math.round(pool / bettors);
		if (current && !bettors) return Math.round(pool);
		if (current && bettors) return Math.round(pool / (bettors + 1));
		return Math.round((pool + 100) / (bettors + 1));
	};

	const cardColor = () => {
		if (Number(player.id) === current) return "has-background-info";
		switch (player.status) {
			case "out":
				return "is-clickable has-background-grey-lighter";
			case "bench":
				return "is-clickable has-background-warning";
			case "starting":
				return "is-clickable has-background-success";
			default:
				return "is-clickable";
		}
	};

	return (
		<div
			className={`column is-centered box pt-0 px-3 pb-3 my-3 mx-3 is-clickable ${cardColor()}`}
			style={{ maxWidth: "336px", minWidth: "336px" }}
			id={player.id}
			data-player_name={player.name}
			onClick={changeBet}>
			<div className='columns is-vcentered is-mobile is-gapless mb-0'>
				<div className='column mx-2 mt-2' style={{ maxWidth: "115px" }}>
					<img
						src={`${player.photo}`}
						style={{ maxWidth: "115px" }}
						width='115'
						height='123'
					/>
				</div>
				<div className='column my-3 mr-3 has-text-centered is-size-8-mobile is-size-8-tablet'>
					<p className={"has-text-weight-bold"}>{player.name}</p>
					<p>{`${applanguage.betCard.bettors} ${player.bettors}`}</p>
					<p>
						{`${applanguage.betCard.prize} `}
						<strong>{`${calculatePoints()}`}</strong>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CardComponent;

// return (
// 	<div
// 		className={`column is-centered box pt-0 px-3 pb-3 my-3 mx-3 ${
// 			current === Number(player.id) ? "has-background-info" : ""
// 		}`}
// 		style={{ maxWidth: "336px", minWidth: "336px" }}
// 		id={player.id}
// 		data-player_name={player.name}
// 		onClick={changeBet}>
// 		<div className='columns is-mobile is-gapless mb-0'>
// 			<div className='column mx-2 mt-2' style={{ maxWidth: "115px" }}>
// 				<img
// 					src={`${player.photo}`}
// 					style={{ maxWidth: "115px" }}
// 					width='115'
// 					height='123'
// 				/>
// 			</div>
// 			<div className='column my-3 mr-3 has-text-centered is-size-8-mobile is-size-8-tablet'>
// 				<p>{refTest.current}</p>
// 				<p className={"has-text-weight-bold"}>{player.name}</p>
// 				<p>{`${applanguage.betCard.bettors} ${player.bettors}`}</p>
// 				<p>
// 					{`${applanguage.betCard.prize} `}
// 					<strong>{`${calculatePoints()}`}</strong>
// 				</p>
// 				<hr className='m-0 mt-2' style={{ borderTop: "solid 1px rgb(0, 0, 0)" }} />
// 				<TestInfo />
// 			</div>
// 		</div>
// 		<div className='columns is-mobile is-gapless p-2'>{<TestTable />}</div>
// 	</div>
// );
// };
