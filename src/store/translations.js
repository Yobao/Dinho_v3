// Importing images for translations...

export const SLOVAK = {
	navbar: {
		table: "Tabuľka",
		bet: "Tipuj",
		account: "Účet",
		login: "Prihlásenie",
		registration: "Registrácia",
		pwdchange: "Zmena hesla",
		logout: "Odhlásenie",
	},
	homeTitle: {
		welcome: "Vitajte na tipovačke zápasov Chelsea",
		info1:
			"Predveď svoje vedomosti o Chelsea a svojou analýzou nazbieraj, čo najviac bodov.",
		info2: "Tipuj strelcov gólov a hraj o ceny vo výške 200€ .",
		info3: "Stačí sa zaregistrovať, a najlepší tiperi z Chelsea komunity budú odmenení.",
		info4:
			"Nestihol si sa pridať? Neobávaj sa, minula sezóna ukázala, že konkurencia sa dá veľmi ľahko obehnúť.",
		example: "Príklad kalkulácie skóre:",
		rules: Rules_sk,
	},
	scoreTableHead: ["Pozícia", "Meno", "Skóre", "Tip", "Zmena"],
	userTableHead: ["Zápas", "Dátum", "Tip", "Body"],
	userTableButton: "Späť",
	betTitle: {
		points1: "Hrá sa o ",
		points2: "bodov",
		time: "Zápas začína o ",
	},
	betTime: {
		day: { one: "deň", multiple1: "dni", multiple2: "dní" },
		hour: { one: "hodina", multiple1: "hodiny", multiple2: "hodín" },
		minute: { one: "minúta", multiple1: "minúty", multiple2: "minút" },
		second: { one: "sekunda", multiple1: "sekundy", multiple2: "sekúnd" },
		interpunction: "a",
	},
	betButtons: ["Aktuálny tip", "Základná 11", "Lavička"],
	betCard: { bettors: "počet hráčov:", prize: "max. možná výhra:" },
	betAlerts: {
		bet: "Tipnuté na hráča",
		info: "Tip sa dá kedykoľvek do začiatku zápasu zmeniť.",
	},
	pagination: { previous: "Predošlá", next: "Nasledujúca" },
	loginModal: [
		[
			{ title: "Meno", placeHolder: "Zadajte Meno", icon: "fas fa-user" },
			{ title: "Heslo", placeHolder: "Zadajte Heslo", icon: "fas fa-lock" },
		],
		[
			{ text: "Prihlásiť sa", style: "is-info" },
			{ text: "Zabudnuté heslo", style: "is-warning" },
		],
		{
			warning: "Nesprávne Meno alebo Heslo. Skúste to prosím znova.",
			somethingWrong: "Niekde nastala chyba. Skúste to prosím znova.",
		},
	],
	regModal: [
		[
			{ title: "Meno", placeHolder: "Zadajte Meno (3-15 znakov)", icon: "fas fa-user" },
			{ title: "Heslo", placeHolder: "Heslo aspoň 6 znakov", icon: "fas fa-lock" },
			{
				title: "Potvrdenie Hesla",
				placeHolder: "Heslo aspoň 6 znakov",
				icon: "fas fa-lock",
			},
			{ title: "Email", placeHolder: "Zadajte Email", icon: "fas fa-envelope" },
		],
		[{ text: "Zaregistrovať", style: "is-info" }],
		{
			nameMin:
				"Zadané Meno musí obsahovať 3-15 znakov a smie obsahovať iba povolené špecialné znaky.",
			nameMinLetter: "Zadané Meno musí obsahovať minimálne 1 písmeno.",
			pwdMin: "Zadané heslo musí obsahovať minimálne 6 znakov.",
			mailFormat: "Zadali ste nesprávny formát e-mailu.",
			fillEverything: "Vyplňte prosím všetky polia.",
			pwdNotMatch: "Zadané heslá sa nezhodujú.",
			exists: "Zadané Meno alebo e-mail už existuje.",
			somethingWrong: "Niekde nastala chyba. Skúste to prosím znova.",
		},
		[
			"Komunita",
			[
				{ name: "chelsea-fc.cz", value: 1 },
				{ name: "Chelsea FB", value: 2 },
			],
		],
	],
	changePwdModal: [
		[
			{ title: "Staré Heslo", placeHolder: "Zadajte staré heslo", icon: "fas fa-lock" },
			{ title: "Nové Heslo", placeHolder: "Heslo aspoň 6 znakov", icon: "fas fa-lock" },
		],
		[{ text: "Zmeniť Heslo", style: "is-info" }],
		{
			pwdMin: "Zadané heslo musí obsahovať minimálne 6 znakov.",
			somethingWrong: "Niekde nastala chyba. Skúste to prosím znova.",
			fillEverything: "Vyplňte prosím všetky polia.",
		},
	],
	forgotPwdModal: [
		[
			{
				title: "Zadaj Email na reset hesla.",
				placeHolder: "Email",
				icon: "fas fa-envelope",
			},
		],
		[{ text: "Vygeneruj heslo", style: "is-info" }],
		{
			mailFormat: "Zadali ste nesprávny formát e-mailu.",
			somethingWrong: "Niekde nastala chyba. Skúste to prosím znova.",
			fillEverything: "Vyplňte prosím všetky polia.",
			mailNotExists: "Zadaná e-mailová adresa v databáze neexistuje",
			passwordSent:
				"Na Vašu e-mailovú adresu bol zaslaný odkaz na reset hesla. V prípade že ste e-mail neobdržali, skontrolujte prosím spam.",
		},
	],
	mailPwd: [
		[
			{ title: "Nové Heslo", placeHolder: "Heslo aspoň 6 znakov", icon: "fas fa-lock" },
			{
				title: "Zopakuj Nové Heslo",
				placeHolder: "Heslo aspoň 6 znakov",
				icon: "fas fa-lock",
			},
		],
		[{ text: "Změnit Heslo", style: "is-warning" }],
		{
			pwdMin: "Zadané heslo musí obsahovať minimálne 6 znakov.",
			somethingWrong: "Niekde nastala chyba. Skúste to prosím znova.",
			fillEverything: "Vyplňte prosím všetky polia.",
			pwdNotMatch: "Zadané heslá sa nezhodujú.",
		},
	],
};

export const CZECH = {
	navbar: {
		table: "Tabulka",
		bet: "Tipuj",
		account: "Účet",
		login: "Přihlášení",
		registration: "Registrace",
		pwdchange: "Změna hesla",
		logout: "Odhlášení",
	},
	homeTitle: {
		welcome: "Vítejte na tipovačce zápasů Chelsea",
		info1: "Předveď své znalosti o Chelsea a svojí analýzou nasbírej co nejvíce bodů.",
		info2: "Tipuj střelce gólů a hraj o ceny ve výši 200€.",
		info3: "Stačí se zaregistrovat, a nejlepší tipeři z Chelsea komunity budou odměněni.",
		info4:
			"Nestihl ses přidat? Neobávej se, minula sezóna ukázala, že konkurence se dá velmi snadno oběhnout.",
		example: "Příklad kalkulace skóre:",
		rules: Rules_cz,
	},
	scoreTableHead: ["Pozice", "Jméno", "Skóre", "Tip", "Změna"],
	userTableHead: ["Zápas", "Datum", "Tip", "Body"],
	userTableButton: "Zpět",
	betTitle: {
		points1: "Hraje se o ",
		points2: "bodů",
		time: "Zápas začíná o ",
	},
	betTime: {
		day: { one: "den", multiple1: "dny", multiple2: "dnů" },
		hour: { one: "hodina", multiple1: "hodiny", multiple2: "hodin" },
		minute: { one: "minuta", multiple1: "minuty", multiple2: "minut" },
		second: { one: "vteřina", multiple1: "vteřiny", multiple2: "vteřin" },
		interpunction: "a",
	},
	betButtons: ["Aktuální tip", "Zakladní 11", "Lavička"],
	betCard: { bettors: "počet hračů:", prize: "max. možná výhra:" },
	betAlerts: {
		bet: "Tipnuto na hráče",
		info: "Tip lze kdykoli do začátku zápasu změnit.",
	},
	pagination: { previous: "Předošlí", next: "Nasledující" },
	loginModal: [
		[
			{ title: "Jméno", placeHolder: "Zadejte Jméno", icon: "fas fa-user" },
			{ title: "Heslo", placeHolder: "Zadejte Heslo", icon: "fas fa-lock" },
		],
		[
			{ text: "Přihlásit se", style: "is-info" },
			{ text: "Zapomenuté heslo", style: "is-warning" },
		],
		{
			warning: "Nesprávné Jméno nebo Heslo. Zkuste to prosím znovu.",
			somethingWrong: "Někde nastala chyba. Zkuste to prosím znovu.",
		},
	],
	regModal: [
		[
			{ title: "Jméno", placeHolder: "Zadajte Jméno (3-15 znaků)", icon: "fas fa-user" },
			{ title: "Heslo", placeHolder: "Heslo alespoň 6 znaků", icon: "fas fa-lock" },
			{
				title: "Potvrdenie Hesla",
				placeHolder: "Heslo alespoň 6 znaků",
				icon: "fas fa-lock",
			},
			{ title: "Email", placeHolder: "Zadejte Email", icon: "fas fa-envelope" },
		],
		[{ text: "Zaregistrovat", style: "is-info" }],
		{
			nameMin:
				"Zadané Jméno musí obsahovat 3-15 znaků a může obsahovat pouze povolené speciální znaky.",
			nameMinLetter: "Zadané Jméno musí obsahovat minimálně 1 písmeno.",
			pwdMin: "Zadané heslo musí obsahovat minimálně 6 znaků.",
			mailFormat: "Zadali jste nesprávný formát e-mailu.",
			fillEverything: "Vyplňte prosím všechna pole.",
			pwdNotMatch: "Zadaná hesla se neshodují.",
			exists: "Zadané Jméno nebo e-mail již existuje.",
			somethingWrong: "Někde nastala chyba. Zkuste to prosím znovu.",
		},
		[
			"Komunita",
			[
				{ name: "chelsea-fc.cz", value: 1 },
				{ name: "Chelsea FB", value: 2 },
			],
		],
	],
	changePwdModal: [
		[
			{ title: "Staré Heslo", placeHolder: "Zadajte staré heslo", icon: "fas fa-lock" },
			{ title: "Nové Heslo", placeHolder: "Heslo alespoň 6 znaků", icon: "fas fa-lock" },
		],
		[{ text: "Změnit Heslo", style: "is-info" }],
		{
			pwdMin: "Zadané heslo musí obsahovat minimálně 6 znaků.",
			somethingWrong: "Někde nastala chyba. Zkuste to prosím znovu.",
			fillEverything: "Vyplňte prosím všechna pole.",
		},
	],
	forgotPwdModal: [
		[
			{
				title: "Zadej Email na reset hesla.",
				placeHolder: "Email",
				icon: "fas fa-envelope",
			},
		],
		[{ text: "Vygeneruj heslo", style: "is-info" }],
		{
			mailFormat: "Zadali jste nesprávný formát e-mailu.",
			somethingWrong: "Někde nastala chyba. Zkuste to prosím znovu.",
			fillEverything: "Vyplňte prosím všechna pole.",
			mailNotExists: "Zadaná e-mailová adresa v databázi neexistuje",
			passwordSent:
				"Na Vaši e-mailovou adresu byl zaslán odkaz na reset hesla. V případě že jste e-mail neobdrželi, zkontrolujte prosím spam.",
		},
	],
	mailPwd: [
		[
			{ title: "Nové Heslo", placeHolder: "Heslo alespoň 6 znaků", icon: "fas fa-lock" },
			{
				title: "Zopakuj Nové Heslo",
				placeHolder: "Heslo alespoň 6 znaků",
				icon: "fas fa-lock",
			},
		],
		[{ text: "Změnit Heslo", style: "is-warning" }],
		{
			pwdMin: "Zadané heslo musí obsahovat minimálně 6 znaků.",
			somethingWrong: "Někde nastala chyba. Zkuste to prosím znovu.",
			fillEverything: "Vyplňte prosím všechna pole.",
			pwdNotMatch: "Zadaná hesla se neshodují.",
		},
	],
};

export const ENGLISH = {
	navbar: {
		table: "Table",
		bet: "Bet",
		account: "Account",
		login: "Login",
		registration: "Registration",
		pwdchange: "Change password",
		logout: "Logout",
	},
	homeTitle: {
		welcome: "Welcome to the Chelsea match prediction game",
		info1:
			"Show off your knowledge of Chelsea and collect as many points as possible with your analysis.",
		info2: "Guess the goal scorers and play for prizes of €200.",
		info3:
			"Just register, and the best tipsters from the Chelsea community will be rewarded.",
		info4:
			"Did you miss the start of the season? Don't worry, last season showed that the competition can be overtaken very easily.",
		example: "Example of score calculation:",
		rules: Rules_en,
	},
	scoreTableHead: ["Position", "Name", "Points", "Player", "Change"],
	userTableHead: ["Match", "Date", "Player", "Points"],
	userTableButton: "Back",
	betTitle: {
		points1: "Prize pool is ",
		points2: "points",
		time: "Match starts in ",
	},
	betTime: {
		day: { one: "day", multiple1: "days", multiple2: "days" },
		hour: { one: "hour", multiple1: "hours", multiple2: "hours" },
		minute: { one: "minute", multiple1: "minutes", multiple2: "minutes" },
		second: { one: "second", multiple1: "seconds", multiple2: "seconds" },
		interpunction: "and",
	},
	betButtons: ["Current guess", "Starting 11", "Bench"],
	betCard: { bettors: "number of users:", prize: "potential win:" },
	betAlerts: {
		bet: "You bet on",
		info: "The tip can be changed at any time before the start of the match.",
	},
	pagination: { previous: "Previous", next: "Next" },
	loginModal: [
		[
			{ title: "Name", placeHolder: "Enter a Name", icon: "fas fa-user" },
			{ title: "Password", placeHolder: "Enter a Password", icon: "fas fa-lock" },
		],
		[
			{ text: "Login", style: "is-info" },
			{ text: "Forgot password?", style: "is-warning" },
		],
		{
			warning: "Incorrect Username or Password. Please try again.",
			somethingWrong: "Something went wrong. Please try again.",
		},
	],
	regModal: [
		[
			{ title: "Name", placeHolder: "Enter a Name(3-15 chars)", icon: "fas fa-user" },
			{ title: "Password", placeHolder: "At least 6 characters", icon: "fas fa-lock" },
			{
				title: "Confirm Password",
				placeHolder: "At least 6 characters",
				icon: "fas fa-lock",
			},
			{ title: "Email", placeHolder: "Enter a Email", icon: "fas fa-envelope" },
		],
		[{ text: "Sign In", style: "is-info" }],
		{
			nameMin:
				"3-15 characters are required for Name and you can use only certain special characters.",
			nameMinLetter: "At least 1 letter is required for Name.",
			pwdMin: "At least 6 characters are required for passowrd.",
			mailFormat: "You have entered an incorrect email format.",
			fillEverything: "Please fill in all fields.",
			pwdNotMatch: "Passwords do not match.",
			exists: "Name or e-mail already exists.",
			somethingWrong: "Something went wrong. Please try again.",
		},
		[
			"Community",
			[
				{ name: "chelsea-fc.cz", value: 1 },
				{ name: "Chelsea FB", value: 2 },
			],
		],
	],
	changePwdModal: [
		[
			{
				title: "Old Password",
				placeHolder: "Enter the Old Password",
				icon: "fas fa-lock",
			},
			{
				title: "New Password",
				placeHolder: "At least 6 characters",
				icon: "fas fa-lock",
			},
		],
		[{ text: "Change Password", style: "is-info" }],
		{
			pwdMin: "At least 6 characters are required for passowrd.",
			somethingWrong: "Something went wrong. Please try again.",
			fillEverything: "Please fill in all fields.",
		},
	],
	forgotPwdModal: [
		[
			{
				title: "Enter your email to reset your password.",
				placeHolder: "Email",
				icon: "fas fa-envelope",
			},
		],
		[{ text: "Generate a password", style: "is-info" }],
		{
			mailFormat: "You have entered an incorrect email format.",
			somethingWrong: "Something went wrong. Please try again.",
			fillEverything: "Please fill in all fields.",
			mailNotExists: "The e-mail address does not exist in the database.",
			passwordSent:
				"A reset link has been sent to your e-mail address. If you did not receive the email, please check your spam folder.",
		},
	],
	mailPwd: [
		[
			{
				title: "New Password",
				placeHolder: "At least 6 characters",
				icon: "fas fa-lock",
			},
			{
				title: "Repeat New Password",
				placeHolder: "At least 6 characters",
				icon: "fas fa-lock",
			},
		],
		[{ text: "Change Password", style: "is-warning" }],
		{
			pwdMin: "At least 6 characters are required for passowrd.",
			somethingWrong: "Something went wrong. Please try again.",
			fillEverything: "Please fill in all fields.",
			pwdNotMatch: "Passwords do not match.",
		},
	],
};
