import {Layout} from '@/components/layouts/Post';
import {getPost} from "@/actions/pagination";
import {Page as PageComponent} from "@/components/Page";
import * as React from "react";
import type {Metadata} from 'next';

export async function generateMetadata({params}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const {slug} = await params;
	const post = await getPost("index", "");

	if (!post) {
		return {
			title: 'Page Not Found'
		};
	}

	return {
		title      : post.title,
		description: post.description
	};
}

export default async function Page({params}: {
	params: Promise<{ slug: string }>
}) {
	const {slug} = await params;
	const post = await getPost("index", "");

	if (!post) {
		// return 404 page
		return null;
	}

	return (
		<Layout>
			<PageComponent post={post}/>
		</Layout>
	);
}
