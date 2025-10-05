"use client";

import {Button} from "@/components/Button";
import * as React from "react";
import {useInView} from 'react-intersection-observer';


import {getPosts} from "@/actions/pagination";
import {components as MDXComponents} from "@/components/mdx";
import type {MdxEntry} from "@/lib/mdx";

import Post from "@/components/Post";

export default function Posts({initialPosts, perPage, totalPages, collectionPath}: {
	initialPosts: MdxEntry[];
	perPage: number;
	totalPages: number;
	collectionPath: string;
}) {
	const [offset, setOffset] = React.useState(perPage);
	const [posts, setPosts] = React.useState<MdxEntry[]>(initialPosts);
	const [wantedMore, setWantedMore] = React.useState(false);
	const {ref, inView} = useInView();

	const hasMorePages = offset < (totalPages * perPage);

	const loadMore = async () => {
		const results = await getPosts(collectionPath, offset, perPage);
		setOffset(offset => offset + perPage);
		setPosts(posts => [...posts, ...results.posts]);
	};

	React.useEffect(() => {
		if (inView && wantedMore) {
			loadMore().catch((err) => console.error(err));
		}
	}, [inView, wantedMore]);

	return <>
		{posts.map((post) => (
			<Post isPartOfList={true} post={post} key={post.slug}/>
		))}

		<MDXComponents.article id={`pagination-${collectionPath}`}>
			{(hasMorePages && !wantedMore) && (
				<Button
					onClick={() => setWantedMore(true)}
					className={"w-full h-12 cursor-pointer text-primary-lighter"}>
					Load more
				</Button>
			)}

			{(hasMorePages && wantedMore) && (
				<div ref={ref}>
					Loading...
				</div>
			)}
		</MDXComponents.article>
	</>;
}
