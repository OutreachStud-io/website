import {Layout} from '@/components/layouts/Post';
import {getPost} from "@/actions/pagination";
import Feature from "@/components/Feature";
import * as React from "react";
import type {Metadata} from 'next';

export async function generateMetadata({params}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const {slug} = await params;
	const feature = await getPost(slug, "features");

	if (!feature) {
		return {
			title: 'Feature Not Found'
		};
	}

	return {
		title      : `${feature.title} - Features`,
		description: feature.description
	};
}

export default async function Page({params}: {
	params: Promise<{ slug: string }>
}) {
	const {slug} = await params;
	const feature = await getPost(slug, "features");

	if (!feature) {
		// return 404 page
		return null;
	}

	return (
		<Layout>
			<Feature feature={feature} isPartOfList={false}/>
		</Layout>
	);
}
