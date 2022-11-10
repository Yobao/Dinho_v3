import React from "react";
import Brand from "../../assets/brand.png";

const BrandImage = ({ style }) => {
	return (
		<img
			src={Brand}
			style={{ maxHeight: style.height + "px" }}
			height={style.height}
			width={style.width}
		/>
	);
};

export default React.memo(BrandImage);
