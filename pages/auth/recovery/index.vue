<template>
	<div class="flex flex-col items-center">
		<UiCard>
			<div>
				<h3>Reset Password</h3>
				<div class="form-group">
					<label for="password">Password</label>
					<input
						v-model="input.password"
						type="password"
						placeholder="password"
						class="w-sm mx-auto border shadow-sm border-slate-300 placeholder-slate-400 dark:focus:outline-darkPrimary dark:bg-darkBg"
					/>
				</div>
				<div class="flex flex-col gap-4">
					<UiButton class="mt-7" @click="handleSubmit" mode="reverse">
						Reset
					</UiButton>
					<p class="m-2" id="invalid" v-if="authStore.authError !== ''">
						{{ authStore.authError }}
					</p>
				</div>
			</div>
		</UiCard>
	</div>
</template>

<script setup lang="ts">
import { useUiStore } from "~/stores/ui";
import { useAuthStore } from "~/stores/auth";

const router = useRouter();
const uiStore = useUiStore();
const authStore = useAuthStore();
const input = reactive({
	password: "",
});

const handleSubmit = async () => {
	uiStore.toggleFunctionLoading(true);
	await authStore.changePassword(authStore.session.access_token, input.password);
	uiStore.toggleFunctionLoading(false);
};
</script>
