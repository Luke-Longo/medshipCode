import { defineStore } from "pinia";
import { User, Session } from "@supabase/gotrue-js/src/lib/types";
// figure out how to set the expires in field in the session

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null as User | User,
		session: null as Session | Session,
		authError: "" as String,
		expiresIn: null as Number,
		resettingPassword: false as Boolean,
		isAdmin: false as boolean,
	}),
	getters: {
		getUser(state) {
			return state.user;
		},
		isLoggedIn(state) {
			return state.user === null ? false : true;
		},
		isError(state) {
			return state.authError !== "";
		},
		user_id(state) {
			return state.user.id;
		},
		isResetting(state) {
			return state.resettingPassword;
		},
	},
	actions: {
		async checkAdmin(user_id) {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase
					.from("profiles")
					.select("*")
					.eq("user_id", user_id);
				if (error) {
					throw error;
				}
				if (data[0].admin) {
					this.isAdmin = true;
				}
			} catch (error) {
				console.log(error);
			}
		},
		setUser(user: User) {
			this.user = user;
		},
		setError(error: String) {
			this.authError = error;
		},
		setSession(session: Session) {
			this.session = session;
		},
		setResettingPassword(resetting: Boolean) {
			this.resettingPassword = resetting;
		},
		async signUp({ email, password, ...metadata }) {
			const { $supabase } = useNuxtApp();
			try {
				const { error } = await $supabase.auth.signUp(
					{
						email,
						password,
					},
					{
						data: { ...metadata },
						redirectTo: `${window.location.origin}/?source=email`,
					}
				);
				if (error) {
					throw error;
				}
			} catch (e) {
				this.authError = e.message;
			}
		},
		async signIn({ email, password }) {
			const { $supabase, $router } = useNuxtApp();
			try {
				const { user, error, session } = await $supabase.auth.signIn({
					email,
					password,
				});
				if (error) {
					throw error;
				}
				this.setSession(session);
				this.setUser(user);
				await this.checkAdmin(user.id);
				$router.push("/");
			} catch (e) {
				this.authError = e.message;
			}
		},
		async signOut() {
			const { $supabase } = useNuxtApp();
			const router = useRouter();
			try {
				const { error } = await $supabase.auth.signOut();
				if (error) {
					throw error;
				}
				this.setSession(null);
				this.setUser(null);
				router.push("/auth");
			} catch (e) {
				this.authError = e.message;
			}
		},
		// async cookieLogin(cookie) {
		// 	const { $supabase } = useNuxtApp();
		// 	try {
		// 		const { user, error } = await $supabase.auth.api.getUser(cookie);
		// 		if (error) {
		// 			throw error;
		// 		}
		// 		this.setUser(user);
		// 		await this.checkAdmin(user.id);
		// 	} catch (e) {
		// 		this.authError = e.message;
		// 	}
		// },
		async checkRefresh() {
			const { $supabase } = useNuxtApp();
			if (this.session === null) {
				try {
					const supabaseAuthToken = JSON.parse(
						localStorage.getItem("supabase.auth.token")
					);
					if (supabaseAuthToken !== null) {
						const refreshToken = supabaseAuthToken.currentSession.refresh_token;
						const { session, error } = await $supabase.auth.setSession(refreshToken);
						if (error) {
							throw error;
						}
						this.setSession(session);
						this.setUser(session.user);
						await this.checkAdmin(session.user.id);
					}
				} catch (e) {
					this.authError = e.message;
				}
			}
		},
		clear() {
			this.setUser(null);
			this.setSession(null);
			this.setError("");
		},
		async resetPassword(email: string) {
			const { $supabase } = useNuxtApp();
			try {
				const { error } = await $supabase.auth.api.resetPasswordForEmail(email);
				if (error) {
					throw error;
				}
			} catch (e) {
				this.authError = e.message;
			}
		},
		async changePassword(access_token, password: string) {
			const { $supabase } = useNuxtApp();
			try {
				const { error, data } = await $supabase.auth.api.updateUser(access_token, {
					password,
				});
				if (error) {
					throw error;
				}
			} catch (e) {
				this.authError = e.message;
			}
		},
	},
});
