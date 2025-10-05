import {visit} from 'unist-util-visit';

export function remarkImages() {
	return async (tree, file) => {
		const imagePromises = [];

		visit(tree, 'image', (node) => {
			if (node.url.startsWith('@/media/images/')) {
				const imagePath = node.url.replace('@/media/images/', '');

				const promise = import(`../src/media/images/${imagePath}`)
					.then((module) => {
						node.url = module.default.src;
						// Add width/height from imported image
						node.data = {
							...node.data,
							hProperties: {
								...node.data?.hProperties,
								width : module.default.width,
								height: module.default.height,
							},
						};
					})
					.catch((err) => {
						console.warn(`Failed to import image: ${imagePath}`, err);
					});
				imagePromises.push(promise);
			}
		});

		await Promise.all(imagePromises);
	};
}
