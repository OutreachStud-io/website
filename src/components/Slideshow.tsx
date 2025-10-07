"use client";

import {MediaWrapper} from "@/components/MediaWrapper";
import * as React from "react";
import Image, {StaticImageData} from "next/image";
import {
	Lightbox,
	LightboxProps,
	RenderSlideProps,
	isImageFitCover,
	useLightboxProps,
	useLightboxState,
	isImageSlide,
	Slide,
} from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

function isNextJsImage(slide: Slide): slide is StaticImageData {
	return (
		isImageSlide(slide) &&
		typeof slide.width === "number" &&
		typeof slide.height === "number"
	);
}

// this is a single image lightbox
export default function LightboxTrigger(
	{
		slides, selectedIndex = 0, ...props
	}: {
		slides: Slide[];
		selectedIndex?: number
	} & Partial<LightboxProps>) {
	const [open, setOpen] = React.useState(false);

	if (slides.length === 0) {
		return null;
	}

	console.log(slides);

	const imgExtension = slides[0].src.split('.').pop()?.toLowerCase();
	const isGif = imgExtension === 'gif';

	return (
		<div className="cursor-pointer">
			<Image
				alt=""
				sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 95vw"
				{...slides[selectedIndex]}
				priority={false}
				onClick={() => setOpen(true)}
				unoptimized={isGif}
			/>

			<Lightbox
				open={open}
				close={() => setOpen(false)}
				slides={slides}
				render={{slide: LightboxImage}}
				{...props}
			/>
		</div>
	);
}

export interface CarouselProps {
	cycle?: boolean;// cycles between slides automatically
}

// mdx usage:
// {/* display:carousel options:{"cycle": true} */}
// ![Campaign status icons](@/media/images/theme-drk.png)
// ![Campaign status icons](@/media/images/theme-light.png)
export function Carousel(
	props: Partial<LightboxProps> & {
		options?: CarouselProps
	}
) {
	const [open, setOpen] = React.useState(false);
	const [index, setIndex] = React.useState(0);

	const toggleOpen = (state: boolean) => () => setOpen(state);

	const updateIndex = (when: boolean) =>
		({index: current}: { index: number }) => {
			if (when === open) {
				setIndex(current);
			}
		};

	const plugins = [Inline];
	if (props.options?.cycle) {
		plugins.push(Slideshow);
	}

	return (
		<MediaWrapper>
			<Lightbox
				{...props}
				on={{
					view : updateIndex(false),
					click: toggleOpen(true),
				}}
				index={index}
				close={toggleOpen(false)}
				render={{slide: LightboxImage}}
				carousel={{
					padding : 0,
					spacing : 0,
					imageFit: "cover",
				}}
				plugins={plugins}
				slideshow={{
					delay   : 5000,
					autoplay: true,
				}}
				animation={{
					fade: 1000,
				}}
				inline={{
					style: {
						width      : "100%",
						maxWidth   : "900px",
						aspectRatio: "1",
						margin     : "0 auto",
					},
				}}
			/>

			<Lightbox
				{...props}
				render={{slide: LightboxImage}}
				open={open}
				close={toggleOpen(false)}
				index={index}
				on={{view: updateIndex(true)}}
				animation={{fade: 0}}
				controller={{closeOnPullDown: true, closeOnBackdropClick: true}}
			/>
		</MediaWrapper>
	);
}

export function LightboxImage({slide, offset, rect}: RenderSlideProps) {
	const {
			 on      : {click},
			 carousel: {imageFit},
		 } = useLightboxProps();

	const {currentIndex} = useLightboxState();

	const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

	if (!isNextJsImage(slide)) return undefined;

	const width = !cover
		? Math.round(
			Math.min(rect.width, (rect.height / slide.height) * slide.width)
		)
		: rect.width;

	const height = !cover
		? Math.round(
			Math.min(rect.height, (rect.width / slide.width) * slide.height)
		)
		: rect.height;

	const imgExtension = slide.src.split('.').pop()?.toLowerCase();
	const isGif = imgExtension === 'gif';

	return (
		<div style={{position: "relative", width, height}}>
			<Image
				fill
				alt=""
				src={slide.src}
				loading="eager"
				draggable={false}
				placeholder={slide.blurDataURL ? "blur" : undefined}
				style={{
					objectFit: cover ? "cover" : "contain",
					cursor   : click ? "pointer" : undefined,
				}}
				sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
				onClick={
					offset === 0 ? () => click?.({index: currentIndex}) : undefined
				}
				priority={false}
				unoptimized={isGif}
			/>
		</div>
	);
}
