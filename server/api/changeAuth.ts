import { ChangeToken } from "~~/types/change";

export default defineEventHandler(async () => {
	// const body = useBody(event); only for POST requests will throw an error for get requests
	const config = useRuntimeConfig();
	const changeCredentials = {
		client_id: config.private.CHANGE_CLIENT_ID,
		client_secret: config.private.CHANGE_CLIENT_SECRET,
		grant_type: "client_credentials",
	};
	const token: ChangeToken = {
		access_token: "",
		expires_in: 3600,
		token_type: "bearer",
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
			token.access_token = accessToken.access_token;
			token.expires_in = accessToken.expires_in;
			token.token_type = accessToken.token_type;
		} catch (e) {
			console.log(e);
		}
	};
	if (token.access_token === "") {
		await getToken();
		setInterval(getToken, 1000 * 60 * 60 - 1000);
	}

	return { data: token };
});
