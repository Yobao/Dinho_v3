import * as TRANSLATIONS from "./translations";

export const SCORE_TABLE_BODY = [
	{ name: "position", class: "has-text-weight-bold is-unselectable" },
	{ name: "username", class: "is-clickable is-unselectable" },
	{ name: "score", class: "has-background-primary-light is-unselectable" },
	{ name: "last_round_tip_name", class: "is-unselectable" },
	{ name: "last_round_score", class: "is-unselectable" },
];

export const USER_TABLE_BODY = [
	{ name: "opp_name", class: "is-unselectable" },
	{ name: "match_start", class: "has-background-primary-light is-unselectable" },
	{ name: "player_name", class: "is-unselectable" },
	{ name: "score", class: "is-unselectable" },
];

export const FLAGS = {
	cz: {
		text: "Česky",
		flag: "https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/czech_republic-512.png",
		code: "cs",
	},
	sk: {
		text: "Slovensky",
		flag: "https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/slovakia-512.png",
		code: "sk",
	},
	en: {
		text: "English",
		flag: "https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/united_kingdom-1024.png",
		code: "english",
	},
};

const NAVBAR_CONST = [
	{
		path: "/",
		class: "navbar-item",
	},
	{
		path: "/table",
		class: "navbar-item",
	},
];

export const NAVBAR = {
	loggedIn: [...NAVBAR_CONST, {}],
	loggedOut: [{}, {}],
};
