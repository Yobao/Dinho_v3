import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import useFetch from "../../hooks/use-fetch";
import useTitle from "../../hooks/use-title";
import useFormatTime from "../../hooks/use-format-time";
import Pusher from "pusher-js";
import { LanguageContext, CurrentUserContext } from "../../store/user-context";
import { URL } from "../../store/data";
import { ws } from "../../local";

import CardComponent from "./card";
import TimeComponent from "./time";
import LoadingButton from "../../components/ui/button-loading";

const BettingPage = () => {
	const refTest = useRef(0);
	refTest.current = refTest.current + 1;
	//const testTime = "2022-11-17T13:30:00.000Z";
	const testTime = "2022-11-23T15:30:00.000Z";

	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [data, setData] = useState(null);
	const [team, setTeam] = useState(1);
	const { handleTime } = useFormatTime();
	const [forceRefresh, setForceRefresh] = useState(false);

	const options = { method: "GET", token: true };
	const { error, sendRequest } = useFetch();
	const transformData = (data) => {
		setData({ ...data, match: useTitle(data.side, data.match) });
	};

	useEffect(() => {
		let pusher = new Pusher(ws, {
			channelAuthorization: {
				headers: { Authorization: `Bearer ${localStorage.getItem("dinhotoken")}` },
				endpoint: `${URL}/auth`,
			},
			cluster: "eu",
		});

		let channel = pusher.subscribe(`private-${currentUser.user}`);
		channel.bind("new-message", function (data) {
			console.log(data);
		});

		return () => pusher.disconnect();
	}, []);

	useEffect(() => {
		if (!data || forceRefresh) {
			setForceRefresh(false);
			sendRequest(`/players?team=${team}`, options, transformData);
		}
	}, [forceRefresh]);

	const changeBet = useCallback(
		(e) => {
			const betPlayerName = e.currentTarget.dataset.player_name;
			const betPlayerId = e.currentTarget.id;

			const opop = {
				method: "POST",
				token: true,
				undefined,
				//body: JSON.stringify({ player: betPlayerId }),
				body: `player=${15}`,
			};
			const pofunc = (data) => {
				//console.log(data);
			};

			sendRequest(`/bet`, opop, pofunc);
		},
		[sendRequest]
	);

	if (!data) return <LoadingButton />;

	return (
		<div className=''>
			<div className='has-text-centered'>
				<p>{refTest.current}</p>
				<p className='title is-size-3-mobile is-size-2-tablet'>
					{data.match}
					<span className='icon has-text-info tooltip has-tooltip-left has-tooltip-multiline'>
						<i className='fas fa-calendar icon is-small' aria-hidden='true' />
					</span>
				</p>
				<p className='title is-size-4-mobile is-size-3-tablet'>
					{applanguage.betTitle.points1}
					<strong className='has-text-weight-bold'>{` ${data.pool.toLocaleString()} `}</strong>
					{applanguage.betTitle.points2}
				</p>
				<TimeComponent
					//start={data.start}
					start={testTime}
					language={applanguage.betTitle.time}
					forceRefresh={setForceRefresh}
				/>
			</div>

			<div className='columns is-mobile is-centered is-multiline is-gapless'>
				{data.players.map((player) => (
					<CardComponent
						key={`card-${player.name}`}
						current={data.current}
						pool={data.pool}
						player={player}
						changeBet={changeBet}
					/>
				))}
			</div>
		</div>
	);
};

export default BettingPage;
