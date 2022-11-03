import React from "react";
import Brand from "../../assets/brand.png";

const BrandImage = () => {
	return <img src={Brand} style={{ maxHeight: "70px" }} height='69.98' width='76.75' />;
};

export default React.memo(BrandImage);
