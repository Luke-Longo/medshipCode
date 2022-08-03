export default function usePaginated(items, perPage) {
	const page = ref(1);

	const totalPages = computed(() => {
		return items.value.length / perPage;
	});

	const paginatedItems = computed(() => {
		let start = (page.value - 1) * perPage;
		let end = start + (perPage - 1);
		return items.value.slice(start, end);
	});

	return {
		paginatedItems,
		totalPages,
		page,
	};
}
