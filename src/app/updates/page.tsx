import Posts from "@/components/Posts";

import {Layout} from '@/components/layouts/Main';
import {getPosts} from "@/actions/pagination";
import type {Metadata} from "next";
import {Brand} from "../../../constants";

const PER_PAGE = 5;

export async function generateMetadata({params}: {
	params: Promise<{ slug: string[] }>
}): Promise<Metadata> {

	return {
		title      : `Updates - ${Brand}`,
		description: `Stay in the loop with the latest updates and improvements to ${Brand}. Check out our changelog for new features, bug fixes, and more.`,
	};
}

export default async function Page({searchParams}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const {posts, totalPages} = await getPosts("updates", 0, PER_PAGE);

	return (
		<Layout>
			<Posts
				totalPages={totalPages}
				perPage={PER_PAGE}
				collectionPath={"updates"}
				initialPosts={posts}
			/>
		</Layout>
	);
}
