import {type MDXComponents} from "mdx/types";

import * as mdxComponents from '@/components/mdx';

import {ImageGallery} from '@/components/ImageGallery';

export function useMDXComponents(components: MDXComponents) {
	return {
		...components,
		...mdxComponents,
		...{
			ImageGallery
		}
	};
}
