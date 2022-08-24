export default defineNuxtPlugin(async (nuxtApp) => {
	nuxtApp.hook("page:start", async () => {
		await useLoadContent();
	});
});
