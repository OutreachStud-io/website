"use client";

import {MDXClient} from "next-mdx-remote-client";

import {components as MDXComponents} from "@/components/mdx";
import type {MdxEntry} from "@/lib/mdx";


export function Page({post}: { post: MdxEntry }) {
	return (
		<>
			<MDXComponents.article
				id={post.slug}
				key={`hero-${post.slug}`}
			>
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
