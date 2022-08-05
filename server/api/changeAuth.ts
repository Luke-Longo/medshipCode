import { ChangeToken } from "~~/types/change";

export default defineEventHandler(async () => {
	// const body = useBody(event); only for POST requests will throw an error for get requests
	const config = useRuntimeConfig();
	try {
		const changeCredentials = {
			client_id: config.private.CHANGE_CLIENT_ID,
			client_secret: config.private.CHANGE_CLIENT_SECRET,
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
