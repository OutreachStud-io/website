import glob from 'fast-glob';
import type {SerializeResult} from "next-mdx-remote-client";
import * as path from 'path';
import {readFile} from 'fs/promises';
import {serialize} from 'next-mdx-remote-client/serialize';
import {remarkPlugins} from "@/../mdx/remark.mjs";
import {rehypePlugins} from "@/../mdx/rehype.mjs";

async function importEntry(articleFilename: string) {
	try {
		// Dynamic import to get the exported meta
		const mdxModule = await import(`../content/${articleFilename}`);
		const meta = mdxModule.meta;

		// Read the raw MDX file content for processing
		const fullPath = path.join(process.cwd(), 'src/content', articleFilename);
		const source = await readFile(fullPath, 'utf-8');

		const mdxSource = await serialize({
			source : source,
			options: {
				mdxOptions: {
					remarkPlugins,
					rehypePlugins,
				},
			},
		});

		return {
			slug       : '/' + articleFilename.replace(/(\/index)?\.mdx$/, ''),
			date       : meta.date,
			title      : meta.title,
			description: meta.description,
			hero       : (meta.hero && !meta.hero.hideOnPage) ? (await import(`../media/images/${meta.hero.src}`)).default : undefined,
			source     : mdxSource,
			feature    : meta.feature || {},
			update     : meta.update || {},
		};
	} catch (error) {
		console.error(`Error importing MDX entry from "${articleFilename}":`, error);
		throw error;
	}
}

export type MdxEntryUpdate = {
	type?: 'feature' | 'fix' | 'security' | 'performance' | 'version' | 'other'
}

export type MdxEntryFeature = {
	group?: string
	order?: number
}

export type MdxHero = {
	src: string
	// Whether to show the hero image on the page (defaults to true)
	hideOnPage?: boolean
	hideOnList?: boolean
}

export type MdxEntry = {
	slug: string
	date: string
	title: string
	description?: string
	source: SerializeResult & {
		compiledSource?: string
	};
	hero?: MdxHero
	feature?: MdxEntryFeature
	update?: MdxEntryUpdate
}

// getAllMdx retrieves all the MDX files from a specified directory,
// sorts them by date in descending order and returns the sorted posts
// along with the total number of pages based on the provided pagination
// parameters.
export async function getAllMdx(pathSegment: string, offset = 0, perPage = 10): Promise<{
	posts: MdxEntry[];
	totalPages: number;
}> {
	let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
		cwd: path.join(process.cwd(), 'src/content', pathSegment),
	});

	let posts = await Promise.all(articleFilenames.map(
		(filename) => importEntry(path.join(pathSegment, filename))
	));

	const sortedPosts = posts.sort(
		(a: MdxEntry, z: MdxEntry) => new Date(z.date).getTime() - new Date(a.date).getTime(),
	);

	return {
		posts     : sortedPosts.slice(offset, offset + perPage),
		totalPages: Math.ceil(sortedPosts.length / perPage),
	};
}

export async function getMdxBySlug(pathSegment: string, slug: string): Promise<MdxEntry | null> {
	try {
		const articleFilename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`;
		return await importEntry(path.join(pathSegment, articleFilename));
	} catch (error) {
		console.error(`Error loading MDX file for slug "${slug}" in path "${pathSegment}":`, error);
		return null;
	}
}
