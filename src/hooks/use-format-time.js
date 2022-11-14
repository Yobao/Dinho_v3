import React, { useState, useContext, useCallback } from "react";
import moment from "moment";
import { LanguageContext } from "../store/user-context";

const useFormatTime = () => {
	const { applanguage, setApplanguage } = useContext(LanguageContext);

	const handleTime = useCallback((matchStart) => {
		let start = moment.utc(matchStart);
		let currentTime = moment.utc().format();
		let diff = start.diff(currentTime);

		let diffDays = start.clone().diff(currentTime, "days");
		let diffHours = start.clone().subtract(diffDays, "day").diff(currentTime, "hours");
		let diffMinutes = start
			.clone()
			.subtract(diffDays, "day")
			.subtract(diffHours, "hour")
			.diff(currentTime, "minutes");
		let diffSeconds = start
			.clone()
			.subtract(diffDays, "day")
			.subtract(diffHours, "hour")
			.subtract(diffMinutes, "minute")
			.diff(currentTime, "seconds");

		return `${diffDays} ${diffHours} ${diffMinutes} ${diffSeconds}`;
	}, []);

	return { handleTime };
};

export default useFormatTime;
