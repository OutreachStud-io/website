import {mdxAnnotations} from 'mdx-annotations'
import remarkGfm from 'remark-gfm'
import {remarkImages} from './remark-images.mjs'
import {remarkImageGallery} from './remark-image-gallery.mjs'

export const remarkPlugins = [
	mdxAnnotations.remark,
	remarkGfm,
	remarkImages,
	remarkImageGallery,
]
