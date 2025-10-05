'use server';

import {getAllMdx, getMdxBySlug} from "@/lib/mdx";

export const getPosts = async (
	collectionPath: string, page: number, limit: number
) => {
	return await getAllMdx(collectionPath, page, limit);
};

export const getPost = async (
	slug: string, collectionPath: string
) => {
	return await getMdxBySlug(collectionPath, slug);
};
