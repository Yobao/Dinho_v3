import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import useFetch from "../../hooks/use-fetch";
import useTitle from "../../hooks/use-title";
import useFormatTime from "../../hooks/use-format-time";
import { LanguageContext } from "../../store/user-context";
import { URL } from "../../store/data";

import LoadingButton from "../../components/ui/button-loading";
import CardComponent from "./card";

const TimeComponent = ({ start, language }) => {
	const { handleTime } = useFormatTime();
	const [distance, setDistance] = useState(null);

	useEffect(() => {
		let timer = setInterval(() => {
			setDistance(handleTime(start));
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, [handleTime]);

	return (
		<p className='title is-size-4-mobile is-size-3-tablet'>{`${language} ${
			!distance ? handleTime(start) : distance
		}`}</p>
	);
};

const BettingPage = () => {
	const refTest = useRef(0);
	refTest.current = refTest.current + 1;
	const testTime = "2022-11-17T16:30:00.000Z";

	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const [data, setData] = useState(null);
	const [team, setTeam] = useState(1);

	const requestConfig = {
		url: URL + `/players?team=${team}`,
		requestOptions: {
			method: "GET",
			mode: "cors",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("dinhotoken")}`,
				"Access-Control-Allow-Origin": "*",
			},
		},
	};
	const { isLoading, error, sendRequest } = useFetch();
	const transformData = (data) => {
		setData({ ...data, match: useTitle(data.side, data.match) });
	};

	useEffect(() => {
		sendRequest(requestConfig, transformData);
	}, []);

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
				<TimeComponent start={testTime} language={applanguage.betTitle.time} />
			</div>

			<div className='columns is-mobile is-centered is-multiline is-gapless'>
				{data.players.map((player) => (
					<CardComponent
						key={`card-${player.name}`}
						current={data.current}
						pool={data.pool}
						player={player}
					/>
				))}
			</div>
		</div>
	);
};

export default BettingPage;
