import React, { useContext, useRef } from "react";
import { LanguageContext } from "../../store/user-context";

const TestTable = () => {
	return (
		<table
			className='table is-bordered is-striped is-hoverable is-narrow is-fullwidth
        is-mobile has-text-centered'>
			<thead>
				<tr className='is-vcentered is-size-7-mobile is-size-8-tablet is-size-8-desktop is-full-tablet'>
					<th className='has-text-centered p-0'>1.</th>
					<th className='has-text-centered p-0'>2.</th>
					<th className='has-text-centered p-0'>3.</th>
					<th className='has-text-centered p-0'>4.</th>
					<th className='has-text-centered p-0'>5.</th>
				</tr>
			</thead>
			<tbody>
				<tr className='is-vcentered is-size-7-mobile is-size-8-tablet is-size-8-desktop is-full-tablet'>
					<td className='py-0'>1x</td>
					<td className='py-0'>2x</td>
					<td className='py-0'>1x</td>
					<td className='py-0'>0</td>
					<td className='py-0'>1x</td>
				</tr>
				<tr className='is-vcentered is-size-7-mobile is-size-8-tablet is-size-8-desktop is-full-tablet'>
					<td className='py-0'>0.8</td>
					<td className='py-0'>1.5</td>
					<td className='py-0'>2.5</td>
					<td className='py-0'>0.12</td>
					<td className='py-0'>0.75</td>
				</tr>
				<tr className='is-vcentered is-size-7-mobile is-size-8-tablet is-size-8-desktop is-full-tablet'>
					<td className='py-0'>90'</td>
					<td className='py-0'>84'</td>
					<td className='py-0'>94'</td>
					<td className='py-0'>16'</td>
					<td className='py-0'>45'</td>
				</tr>
			</tbody>
		</table>
	);
};

const TestInfo = () => {
	return (
		<div className='columns is-mobile is-gapless'>
			<div className='column has-text-centered'>
				<p>Goals: 19</p>
				<p>xg/90: 0.65</p>
			</div>
			<div className='column has-text-centered'>
				<p>Matches: 11</p>
				<p>G/90: 0.45</p>
			</div>
		</div>
	);
};

const CardComponent = ({ current, pool, player, changeBet }) => {
	const refTest = useRef(0);
	refTest.current = refTest.current + 1;

	const { applanguage, setApplamguage } = useContext(LanguageContext);
	const bettors = player.bettors;
	const id = player.id;

	const calculatePoints = () => {
		if (id == current) return Math.round(pool / bettors);
		if (current && !bettors) return Math.round(pool);
		if (current && bettors) return Math.round(pool / (bettors + 1));
		return Math.round((pool + 100) / (bettors + 1));
	};

	return (
		<div
			className={`column is-centered box pt-0 px-3 pb-3 my-3 mx-3 ${
				current === Number(player.id) ? "has-background-info" : ""
			}`}
			style={{ maxWidth: "336px", minWidth: "336px", zIndex: "10" }}
			id={player.id}
			data-player_name={player.name}
			onClick={changeBet}>
			<div className='columns is-mobile is-gapless mb-0'>
				<div className='column mx-2 mt-2' style={{ maxWidth: "115px" }}>
					<img
						src={`${player.photo}`}
						style={{ maxWidth: "115px" }}
						width='115'
						height='123'
					/>
				</div>
				<div className='column my-3 mr-3 has-text-centered is-size-8-mobile is-size-8-tablet'>
					<p>{refTest.current}</p>
					<p className={"has-text-weight-bold"}>{player.name}</p>
					<p>{`${applanguage.betCard.bettors} ${player.bettors}`}</p>
					<p>
						{`${applanguage.betCard.prize} `}
						<strong>{`${calculatePoints()}`}</strong>
					</p>
					<hr className='m-0 mt-2' style={{ borderTop: "solid 1px rgb(0, 0, 0)" }} />
					<TestInfo />
				</div>
			</div>
			<div className='columns is-mobile is-gapless p-2'>{<TestTable />}</div>
		</div>
	);
};

export default React.memo(CardComponent);
