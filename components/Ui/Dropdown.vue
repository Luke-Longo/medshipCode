<template>
	<div class="dropdown">
		<slot name="dropdown-trigger"></slot>
		<div class="dropdown-content">
			<slot name="dropdown-content"></slot>
		</div>
	</div>
</template>

<style scoped>
.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-content {
	display: none;
	position: absolute;
	min-width: 160px;
	padding: 12px 16px;
	z-index: 1;
}

.dropdown:hover .dropdown-content {
	display: block;
}
</style>
