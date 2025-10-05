"use client";

import clsx from "clsx";
import * as React from "react";

import type {MdxEntry} from "@/lib/mdx";

import Feature from "@/components/Feature";
import {ArticleHeader, ContentWrapper} from "@/components/mdx";

export type TFeaturesProps = {
	group: string,
	features: MdxEntry[];
}

export default function Features({features, collectionPath}: {
	features: TFeaturesProps[];
	collectionPath: string;
}) {
	return (
		<>
				{features.map((group) => {
					return (
						<React.Fragment key={group.group}>
							<ArticleHeader>
								<span className="font-mono">
									{group.group.toUpperCase()}
								</span>
							</ArticleHeader>

							<ContentWrapper>
								<div className={"xl:grid grid-cols-1 xl:grid-cols-2 gap-8"}>
									{group.features.map((feature) => (
										<Feature
											isPartOfList={true}
											feature={feature}
											key={feature.slug}
											className={clsx(
												feature.hero ? "xl:col-span-2" : ""
											)}
										/>
									))}
								</div>
							</ContentWrapper>
						</React.Fragment>
					);
				})}
		</>
	);
}
