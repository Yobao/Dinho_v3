import { toast } from "bulma-toast";

function toastik(msg, type = "is-danger") {
	toast({
		message: msg,
		position: "top-center",
		duration: 3000,
		type: type,
	});
}

export default toastik;
