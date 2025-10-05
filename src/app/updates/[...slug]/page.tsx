import {Layout} from '@/components/layouts/Post';
import {getPost} from "@/actions/pagination";
import Post from "@/components/Post";
import * as React from "react";
import type {Metadata} from 'next';

export async function generateMetadata({params}: {
	params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
	const {slug} = await params;
	const post = await getPost(slug.join('/'), "updates");

	if (!post) {
		return {
			title: 'Update Not Found'
		};
	}

	return {
		title: `${post.title} - Updates`,
		description: post.description
	};
}

export default async function Page({params}: {
	params: Promise<{ slug: string[] }>
}) {
	const {slug} = await params;
	const post = await getPost(slug.join('/'), "updates");

	if (!post) {
		// return 404 page
		return null;
	}

	return (
		<Layout>
			<Post post={post} isPartOfList={false}/>
		</Layout>
	);
}
