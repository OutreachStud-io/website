import {visit} from 'unist-util-visit';

export function remarkImages() {
	return async (tree, file) => {
		const imagePromises = [];

		visit(tree, 'image', (node) => {
			if (node.url.startsWith('@/media/images/')) {
				const imagePath = node.url.replace('@/media/images/', '');

				// keep in mind that this import cannot work witn pngs or gifs
				const promise = import(`../src/media/images/${imagePath}`)
					.then((module) => {
						node.url = module.default.src;
						// Add width/height from imported image
						node.data = {
							...node.data,
						};
					})
					.catch((err) => {
						console.log(`Failed to import image: ${imagePath}`, err);
					});

				imagePromises.push(promise);
			}
		});

		await Promise.all(imagePromises);
	};
}
