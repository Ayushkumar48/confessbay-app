// import type z from 'zod';
// import type { LoginSchema, SignupSchema } from './schema';
// import { login } from '../../routes/(auth)/login/data.remote';
// import { toast } from 'svelte-sonner';
// import { resolve } from '$app/paths';
// import { goto } from '$app/navigation';
// import { signup } from '../../routes/(auth)/signup/date.remote';

// export async function loginSubmit(form: z.infer<LoginSchema>) {
// 	const res = await login(form);
// 	if (!res.success) {
// 		toast.error(res.message!);
// 		return;
// 	}
// 	await fetch('/login', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ userId: res.userId })
// 	});
// 	toast.success('Logged In!');
// 	goto(resolve('/feed'), { replaceState: true });
// }

// export async function signupSubmit(form: z.infer<SignupSchema>) {
// 	const res = await signup(form);
// 	if (!res.success) {
// 		toast.error(res.message!);
// 		return;
// 	}
// 	await fetch('/login', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ userId: res.userId })
// 	});
// 	toast.success('Account created successfully!');
// 	goto(resolve('/feed'), { replaceState: true });
// }
