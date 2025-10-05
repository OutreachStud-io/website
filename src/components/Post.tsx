"use client";

import clsx from "clsx";
import {MDXClient} from "next-mdx-remote-client";
import {Badge} from "@/components/ui/badge";

import {components as MDXComponents} from "@/components/mdx";
import type {MdxEntry} from "@/lib/mdx";
import Link from 'next/link';

// Renders a single post
// @param isPartOfList - if true, the post is part of a list and should be rendered accordingly
export default function Post({post, isPartOfList}: { post: MdxEntry, isPartOfList: boolean }) {
	return (
		<>
			<MDXComponents.article
				id={post.slug}
				date={post.date}
				key={`hero-${post.slug}`}
				className={clsx(
					isPartOfList ? "in-list" : "not-in-list",
				)}
			>

				<PostTitle post={post} isPartOfList={isPartOfList}/>

				{post.hero && (
					<MDXComponents.img src={post.hero.src} width={600} height={400}/>
				)}

				<MDXClient
					scope={post.source.scope}
					compiledSource={`${post.source.compiledSource}`}
					frontmatter={post.source.frontmatter}
					components={MDXComponents}
				/>
			</MDXComponents.article>
		</>
	);
}

function PostTitle({post, isPartOfList}: { post: MdxEntry, isPartOfList: boolean }) {
	let TitleTag = isPartOfList ? 'h2' : 'h1' as any;

	return (
		<TitleTag className={"post_title flex items-center justify-between gap-2"}>
			{isPartOfList && (
				<Link
					href={post.slug}
					className={"border-b border-transparent hover:border-border"}
				>
					{post.title}
				</Link>
			)}

			{!isPartOfList && post.title}

			{(post.update && post.update.type) && (
				<Badge variant="outline" className={"mb-1"}>
					{post.update.type}
				</Badge>
			)}

		</TitleTag>
	);
}
