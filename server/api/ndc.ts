export default defineEventHandler(async (event) => {
	// const body = useBody(event); only for POST requests will throw an error for get requests
	const query = useQuery(event);
	const ndc = query.ndc;
	try {
		const openFdaURL = `https://api.fda.gov/drug/ndc.json?search=product_ndc:"${ndc}"`;
		const res: {
			results: [];
		} = await $fetch(openFdaURL);
		const data = res.results;
		return { data };
	} catch (e) {
		console.log(e);
	}
});
