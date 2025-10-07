import {visit} from 'unist-util-visit';

export function remarkImageGallery() {
	return async (tree) => {
		const nodesToProcess = [];

		// Find all paragraph nodes that contain only consecutive images
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!parent || index === undefined) return;

			// Check if previous sibling is a gallery directive comment
			let displayType = 'grid'; // default
			let options = '{}'; // default animation

			const prevSibling = parent.children[index - 1];

			if (prevSibling &&
				(prevSibling.type === 'html' || prevSibling.type === 'mdxFlowExpression') &&
				(prevSibling.value || prevSibling.children?.[0]?.value || '').includes('display:')) {

				const commentText = prevSibling.value ||
					(prevSibling.children?.[0]?.value) ||
					JSON.stringify(prevSibling);

				// Parse display type
				const displayMatch = commentText.match(/display:(\w+)/);
				if (displayMatch) {
					displayType = displayMatch[1];
				}

				// Parse any additional options
				const optionsMatch = commentText.match(/options:({[^}]+})/);
				if (optionsMatch) {
					options = optionsMatch[1];
				}

				// Remove the directive comment
				parent.children.splice(index - 1, 1);
				index = index - 1; // Adjust index after removal
			}

			// filter out new lines that are present from but abort if we have multiple blank lines in a row
			let justremoved = false;
			node.children = node.children.filter((child, index) => {
				if (child.type === 'text' && child.value.trim() === '' && !justremoved) {
					justremoved = true;
					return false;
				}
				justremoved = false;
				return true;
			});

			// Check if this paragraph contains only images
			const hasOnlyImages = node.children.length > 0 &&
				node.children.every(child => child.type === 'image');

			if (hasOnlyImages && node.children.length >= 2) {
				nodesToProcess.push({
					node,
					index,
					parent,
					images: node.children,
					displayType,
					options
				});
			}
		});

		// Resolve images for all galleries
		for (const {parent, index, images, displayType, options} of nodesToProcess) {
			const resolvedImages = images.map(img => ({
				src   : img.url,
				alt   : img.alt || '',
				title : img.title || '',
				width : img.data?.hProperties?.width || 1200,
				height: img.data?.hProperties?.height || 800
			}));

			// Replace the paragraph with the gallery
			parent.children[index] = {
				type      : 'mdxJsxFlowElement',
				name      : 'ImageGallery',
				attributes: [
					{
						type : 'mdxJsxAttribute',
						name : 'images',
						value: {
							type : 'mdxJsxAttributeValueExpression',
							value: JSON.stringify(resolvedImages),
							data : {
								estree: {
									type: 'Program',
									body: [{
										type      : 'ExpressionStatement',
										expression: {
											type : 'Literal',
											value: JSON.stringify(resolvedImages),
											raw  : JSON.stringify(JSON.stringify(resolvedImages))
										}
									}]
								}
							}
						}
					},
					{
						type : 'mdxJsxAttribute',
						name : 'display',
						value: displayType
					},
					{
						type : 'mdxJsxAttribute',
						name : 'options',
						value: options
					}
				],
				children  : []
			};
		}
	};
}
