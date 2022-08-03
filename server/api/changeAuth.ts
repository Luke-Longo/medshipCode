import { ChangeToken } from "~~/types/types";

export default defineEventHandler(async () => {
	// const body = useBody(event); only for POST requests will throw an error for get requests
	try {
		const changeCredentials = {
			client_id: "KcZmDzrWG1kDSfIVik54OO4XBM0DtXnk",
			client_secret: "ZkhfIJvGc03xDnCs",
			grant_type: "client_credentials",
		};
		const accessToken: ChangeToken = await $fetch(
			`https://sandbox.apigw.changehealthcare.com/apip/auth/v2/token`,
			{
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: changeCredentials,
			}
		);
		console.log(accessToken);
		return { data: accessToken };
	} catch (e) {
		console.log(e);
	}
});
