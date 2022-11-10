export const SCORE_TABLE_BODY = [
	{ name: "position", class: "has-text-weight-bold is-unselectable" },
	{ name: "username", class: "is-clickable is-unselectable" },
	{ name: "score", class: "has-background-primary-light is-unselectable" },
	{ name: "last_round_tip_name", class: "is-unselectable" },
	{ name: "last_round_score", class: "is-unselectable" },
];

export const USER_TABLE_BODY = [
	{ name: "opponent", class: "is-unselectable" },
	{ name: "match_start", class: "has-background-primary-light is-unselectable" },
	{ name: "player_name", class: "is-unselectable" },
	{ name: "score", class: "is-unselectable" },
];

export const FLAGS = {
	CZECH: {
		text: "Česky",
		flag: "https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/czech_republic-512.png",
		code: "cs",
	},
	SLOVAK: {
		text: "Slovensky",
		flag: "https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/slovakia-512.png",
		code: "sk",
	},
	ENGLISH: {
		text: "English",
		flag: "https://cdn0.iconfinder.com/data/icons/all-national-flags-of-the-world-very-high-quality-/283/united_kingdom-1024.png",
		code: "en",
	},
};

const styling = {
	style: { paddingLeft: "8px", paddingRight: "8px" },
};

export const NAVBAR = {
	visible: [
		{
			name: "home",
			type: "link",
			path: "/",
			...styling,
		},
		{
			name: "table",
			type: "link",
			path: "/table",
			...styling,
		},
	],
	logIn: [
		{
			name: "bet",
			type: "link",
			path: "/bet",
			...styling,
		},
		{
			name: "profil",
			type: "link",
			path: "/profil",
			...styling,
		},
	],
	logOut: [
		{
			name: "login",
			type: "modal",
			...styling,
		},
		{
			name: "registration",
			type: "modal",
			...styling,
		},
	],
	menu: [
		{
			name: "pwdchange",
			type: "modal",
			className: "navbar-item is-mobile is-size-6-tablet is-size-6-desktop",
			style: { paddingLeft: "8px", paddingRight: "40px" },
		},
		{
			name: "logout",
			type: "link",
			path: "/",
			className: "navbar-item is-mobile is-size-6-tablet is-size-6-desktop",
			style: { paddingLeft: "8px", paddingRight: "40px" },
		},
	],
};
