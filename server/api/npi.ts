export default defineEventHandler(async (event) => {
	interface NppesRes {
		result_count: number;
		results: [];
	}
	const npi = "1770819567";
	const npppes = `https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${npi}`;
	const res: any = await $fetch(npppes);
	const resData = res.results;
	return resData;
});
