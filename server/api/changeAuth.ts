import { ChangeToken } from "~~/types/change";
import { db } from "~/server/db/index";

export default defineEventHandler(async () => {
	// const body = useBody(event); only for POST requests will throw an error for get requests
	const config = useRuntimeConfig();
	const changeCredentials = {
		client_id: config.private.CHANGE_CLIENT_ID,
		client_secret: config.private.CHANGE_CLIENT_SECRET,
		grant_type: "client_credentials",
	};

	const getToken = async () => {
		try {
			const accessToken: ChangeToken = await $fetch(
				`https://sandbox.apigw.changehealthcare.com/apip/auth/v2/token`,
				{
					headers: { "Content-Type": "application/json" },
					method: "POST",
					body: changeCredentials,
				}
			);
			db.changeToken.access_token = accessToken.access_token;
			db.changeToken.expires_in = accessToken.expires_in;
			db.changeToken.token_type = accessToken.token_type;
		} catch (e) {
			console.log(e);
		}
	};
	if (db.changeToken.access_token === "") {
		console.log("Getting token");
		// await getToken();
		// setInterval(async () => {
		// 	console.log("Refreshing token");
		// 	await getToken();
		// }, token.expires_in * 1000 - 1000);
	}
	let token = db.changeToken;

	return { data: token };
});
