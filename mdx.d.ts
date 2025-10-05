declare module '*.mdx' {
	import type { ComponentType } from 'react';

	interface MDXProps {
		[key: string]: any;
	}

	const MDXContent: ComponentType<MDXProps>;
	export default MDXContent;
}
