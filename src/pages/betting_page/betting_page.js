import React, { useState, useEffect, useContext, useMemo } from "react";
import useFetch from "../../hooks/use-fetch";
import { LanguageContext } from "../../store/user-context";
import { URL } from "../../store/data";

import LoadingButton from "../../components/ui/button-loading";
import CardComponent from "./card";

const BettingPage = () => {
	const { appLanguage, setAppLanguage } = useContext(LanguageContext);
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
		console.log(data);
		setData(data);
	};

	useEffect(() => {
		sendRequest(requestConfig, transformData);
	}, []);

	if (isLoading) return <LoadingButton />;

	return (
		<div className='columns is-centered is-gapless'>
			<div className='column px-0'>
				<div className='columns is-mobile is-centered is-multiline is-gapless'>
					{data?.players.map((player) => (
						<CardComponent
							key={`card-${player.name}`}
							data={{
								current: data?.current,
								pool: data?.pool,
								player: player,
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default BettingPage;
