import {ContentWrapper} from "@/components/mdx";
import {AlertCircleIcon, CheckCircle2Icon, PopcornIcon} from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert";

import Features from "@/components/Features";

import {Layout} from '@/components/layouts/Main';
import {getPosts} from "@/actions/pagination";
import type {Metadata} from "next";
import * as React from "react";
import {Brand} from "../../../constants";

const PER_PAGE = 5000;

export async function generateMetadata({params}: {
	params: Promise<{ slug: string[] }>
}): Promise<Metadata> {

	return {
		title      : `Features - ${Brand}`,
		description: `Discover the powerful features of ${Brand} and how it can help you boost your marketing efforts`,
	};
}

export default async function Page() {
	const {posts, totalPages} = await getPosts("features", 0, PER_PAGE);

	const groupOrder = [
		'general',
		'projects',
		'leads',
		'campaigns',
		'analytics',
		'integrations',
		'settings',
		'other'
	];

	// Sort posts by feature.group and feature.order
	const sortedPosts = posts.sort((a, b) => {
		// First, sort by group using groupOrder
		const groupA = a.feature?.group || 'other';
		const groupB = b.feature?.group || 'other';

		if (groupA !== groupB) {
			const indexA = groupOrder.indexOf(groupA.toLowerCase());
			const indexB = groupOrder.indexOf(groupB.toLowerCase());

			// If both groups are in the order list, sort by their index
			if (indexA !== -1 && indexB !== -1) {
				return indexA - indexB;
			}

			// If only one is in the list, prioritize it
			if (indexA !== -1) return -1;
			if (indexB !== -1) return 1;

			// If neither is in the list, sort alphabetically
			return groupA.localeCompare(groupB);
		}

		// Within the same group, sort by order (undefined orders go last)
		const orderA = a.feature?.order ?? 999;
		const orderB = b.feature?.order ?? 999;

		if (orderA !== orderB) {
			return orderA - orderB;
		}

		// If both group and order are the same, sort by date (newest first)
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	// Group posts by feature.group
	const groupedPosts = sortedPosts.reduce((acc, post) => {
		const groupName = post.feature?.group || 'Other';

		let existingGroup = acc.find(g => g.group === groupName);
		if (!existingGroup) {
			existingGroup = {group: groupName, features: []};
			acc.push(existingGroup);
		}

		existingGroup.features.push(post);
		return acc;
	}, [] as { group: string; features: typeof posts }[]);

	return (
		<Layout>
			<Features
				collectionPath={"features"}
				features={groupedPosts}
			/>

			<ContentWrapper>
				<Alert>
					<AlertCircleIcon className={"stroke-accent-2"}/>
					<AlertTitle>Regularly updated list</AlertTitle>
					<AlertDescription>
						This list is regularly updated as new features are added.
						Make sure to subscribe to our newsletter or follow us on social media to stay
						in the loop.
					</AlertDescription>
				</Alert>
			</ContentWrapper>
		</Layout>
	);
}
