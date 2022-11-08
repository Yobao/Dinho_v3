import React, { useState, useEffect, useContext, useRef } from "react";
import useFetch from "../../hooks/use-fetch";
import { URL } from "../../store/data";
import { CurrentUserContext, LanguageContext } from "../../store/user-context";

import LoadingButton from "../../components/ui/button-loading";
import "./../body.css";

const HomePage = () => {
	const { applanguage, setApplanguage } = useContext(LanguageContext);
	const text = applanguage.homeTitle;
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let timer = setTimeout(() => {
			setIsLoading(false);
		}, 800);

		return () => {
			clearInterval(timer);
		};
	});

	return (
		<React.Fragment>
			{/* {isLoading && <LoadingButton />} */}

			<div className='column is-centered has-text-centered is-7-desktop home-width'>
				<h1 className='title is-3'>{applanguage.homeTitle.welcome}</h1>
				<br />
				<h3 className='title is-5'>{applanguage.homeTitle.info1}</h3>
				<h3 className='title is-5'>{applanguage.homeTitle.info2}</h3>
				<h3 className='title is-5'>{applanguage.homeTitle.info3}</h3>
				<h3 className='title is-5'>{applanguage.homeTitle.info4}</h3>
				<br />

				<div className='column'>
					<iframe
						src='https://flo.uri.sh/visualisation/10156801/embed'
						title='Interactive or visual content'
						className='flourish-embed-iframe'
						frameBorder='0'
						scrolling='no'
						style={{
							width: "100%",
							height: "35em",
						}}
						sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
				</div>

				<br />
				<br />
				<h2 className='title is-3'>{applanguage.homeTitle.example}</h2>

				<figure className='image is-inline-block column'>
					<img
						src={applanguage.homeTitle.rules}
						className=''
						onLoad={() => setIsLoading(false)}
						style={!isLoading ? {} : { display: "none" }}
					/>
				</figure>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
