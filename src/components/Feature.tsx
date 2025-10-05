"use client";

import {components as MDXComponents} from "@/components/mdx";
import type {MdxEntry} from "@/lib/mdx";
import clsx from "clsx";
import {MDXClient} from "next-mdx-remote-client";
import Link from 'next/link';

export default function Feature({feature, isPartOfList, className}: {
	feature: MdxEntry,
	isPartOfList: boolean,
	className?: string
}) {
	if (isPartOfList) {
		return <ListFeature feature={feature} className={className}/>;
	}

	return (
		<MDXComponents.article id={`feature-${feature.slug}`} className={""}>
			<h1 className={""}>{feature.title}</h1>
			{feature.hero && (
				<MDXComponents.img src={feature.hero.src}/>
			)}

			<MDXClient
				scope={feature.source.scope}
				compiledSource={`${feature.source.compiledSource}`}
				frontmatter={feature.source.frontmatter}
				components={MDXComponents}
			/>
		</MDXComponents.article>
	);
}

const ListFeature = ({feature, className}: { feature: MdxEntry, className?: string }) => {
	// I need this one populated
	const hasContent = !feature.source.compiledSource?.includes('return _jsx(_Fragment, {});');

	const linkProps = hasContent ? {href: feature.slug} : {};
	const Tag = hasContent ? Link : 'div' as any;

	return (
		<div className={clsx(
			"flex flex-col gap-y-2 mb-4",
			hasContent && "hover:opacity-90",
			className
		)}>
			{feature.hero && (
				<MDXComponents.img src={feature.hero.src}/>
			)}

			<Tag {...linkProps}>
				<h4 className={clsx(
					"font-extrabold text-primary",
					feature.hero && "mt-2",
					hasContent && "text-accent-1!"
				)}>{feature.title}</h4>

				{feature.description && (
					<p className={"text-sm text-muted-foreground"}>{feature.description}</p>
				)}
			</Tag>
		</div>
	);
};
