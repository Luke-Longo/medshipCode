export default function usePaginate(items, pageSize) {
	const page = ref(1);

	const pages = computed(() => Math.ceil(items.value.length / pageSize.value));

	const start = computed(() => (page.value - 1) * pageSize.value);

	const end = computed(() => page.value * pageSize.value);

	const paginatedItems = computed(() =>
		items.value.slice(start.value, end.value)
	);

	const nextPage = () => {
		if (page.value < pages.value) {
			page.value++;
		}
	};
	const previousPage = () => {
		if (page.value > 1) {
			page.value--;
		}
	};
	const firstPage = () => {
		page.value = 0;
	};
	const lastPage = () => {
		page.value = pages.value - 1;
	};
	return {
		page,
		pages,
		start,
		end,
		paginatedItems,
		nextPage,
		previousPage,
		firstPage,
		lastPage,
	};
}
