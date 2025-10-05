'use client';

import {ImageCompareSlider, ImageCompareSliderOptions} from "@/components/ImageCompareSlider";
import LightboxTrigger, {Carousel, CarouselProps} from "@/components/Slideshow";
import clsx from 'clsx';

interface ImageData {
	src: string;
	alt: string;
	title?: string;
}


type GalleryOptions = CarouselProps | ImageCompareSliderOptions;

interface ImageGalleryProps {
	images: ImageData[] | string;
	display?: 'grid' | 'carousel' | 'compare';
	options?: string;
	className?: string;
}

export default function ImageGallery({images, display = 'grid', options, className}: ImageGalleryProps) {
	let galleryOptions: GalleryOptions = {};
	if (options) {
		try {
			galleryOptions = JSON.parse(options);
		} catch (e) {
			console.warn("Failed to parse gallery options:", e);
		}
	}

	// Parse images if it's a string (from remark plugin)
	const imageList: ImageData[] = typeof images === 'string'
		? JSON.parse(images)
		: images;

	if (!imageList || imageList.length === 0) {
		return null;
	}

	// Prepare slides for lightbox
	const slides = imageList.map(img => ({
		src   : img.src,
		alt   : img.alt,
		width : 1200, // Default width for lightbox
		height: 800  // Default height for lightbox
	}));

	if (display === 'compare') {
		return (
			<ImageCompareSlider
				imageOne={slides[0]}
				imageTwo={slides[1]}
				options={galleryOptions as ImageCompareSliderOptions}
			/>
		);
	}

	if (display === 'carousel') {
		return (
			<Carousel slides={slides} options={galleryOptions as CarouselProps}/>
		);
	}

	return (
		<div className={clsx(
			"grid gap-4 rounded-lg overflow-hidden",
			imageList.length === 2 && "grid-cols-2",
			imageList.length === 3 && "grid-cols-3",
			imageList.length >= 4 && "grid-cols-2 md:grid-cols-3",
			className
		)}>
			{imageList.map((img, index) => (
				<div
					key={index}
					className={clsx(
						"relative aspect-[4/3] bg-primary-foreground border border-muted",
						"rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
					)}
				>
					<LightboxTrigger
						slides={slides}
						selectedIndex={index}
					/>
				</div>
			))}
		</div>
	);
}
