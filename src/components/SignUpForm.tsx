"use client";

import React from 'react';
import {CheckCircle2Icon} from "lucide-react";

import {Button} from '@/components/ui/button';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export function SignUpForm() {
	let id = React.useId();
	const [email, setEmail] = React.useState('');
	const [submitted, setSubmitted] = React.useState(false);
	const [submitting, setSubmitting] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [subscribed, setSubscribed] = React.useState(false);

	const signupUrl = "/api/newsletter/subscribe";

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setSubmitting(true);

		fetch(signupUrl, {
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body   : JSON.stringify({
				"email": email,
			}),
		}).then(response => {
			if (response.ok) {
				setEmail('');
				setSubscribed(true);
			} else {
				setError(true);
			}
		}).catch(error => {
			setError(true);
			console.error('Error:', error);
		}).finally(() => {
			setSubmitted(true);
			setSubmitting(false);
		});
	};

	if (submitted) {
		if (subscribed) {
			return (
				<Alert className={"mt-4"}>
					<CheckCircle2Icon/>
					<AlertTitle>Thank you!</AlertTitle>
					<AlertDescription>
						You will receive an opt-in confirmation email shortly.
					</AlertDescription>
				</Alert>
			);
		}

		if (error) {
			return (
				<Alert className={"mt-4"} variant={"destructive"}>
					<AlertTitle>Something went wrong!</AlertTitle>
					<AlertDescription>
						Please try again later. The browser console might have more details.
					</AlertDescription>
				</Alert>
			);
		}
	}

	return (
		<form className="relative isolate mt-4 flex items-center pr-1" onSubmit={handleSubmit}>
			<label htmlFor={id} className="sr-only">
				Email address
			</label>
			<input
				required
				type="email"
				autoComplete="email"
				name="email"
				id={id}
				placeholder="Email address"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="peer w-0 flex-auto bg-transparent! px-4 py-2.5 text-base text-primary placeholder:text-primary/50 focus:outline-hidden sm:text-[0.8125rem]/6"
			/>
			<Button
				type="submit"
				className={"cursor-pointer"}
				disabled={submitting}
			>
				{submitting ? 'Submitting...' : 'Notify me'}
			</Button>

			<div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-primary/15"/>
			<div className="absolute inset-0 -z-10 rounded-lg bg-primary-foreground/50 ring-1 ring-primary/15 transition peer-focus:ring-primary"/>
		</form>
	);
}
