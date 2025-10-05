'use client';

import Image, {type ImageProps} from 'next/image';
import LightboxTrigger from "@/components/Slideshow";
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {FormattedDate} from '@/components/FormattedDate';
import {
	Command,
	Blocks,
	PartyPopper
} from 'lucide-react';
import ImageGallery from '@/components/ImageGallery';

export const a = function ExternalLink(props: React.ComponentPropsWithoutRef<'a'>) {
	const href = props.href || '';
	const isExternal = href.startsWith('http://') || href.startsWith('https://');

	if (isExternal) {
		return (
			<a
				{...props}
				target="_blank"
				rel="noopener noreferrer"
			/>
		);
	}

	return <Link {...props} href={href}/>;
};

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export const img = function Img(props: ImagePropsWithOptionalAlt) {
	const width = Number(props.width) || 800;

	// Why do we have sometimes and object inside src? The .default export differs based on file type:
	//   - GIF: default = string path
	//   - PNG/JPG: default = StaticImageData object
	//
	//   That's why sometimes props.src is a string (GIFs) and sometimes it's an object with src
	//   property (PNGs). Next.js automatically decides this based on whether the image can be
	//   optimized or not.
	//
	//   GIFs can't be optimized by Next.js Image component, so they're treated as simple static
	//   assets. PNGs/JPGs can be optimized, so Next.js provides the full metadata object.

	const srcValue = typeof props.src === 'string' ? props.src :
		(typeof props.src === 'object' && 'src' in props.src) ? props.src.src : String(props.src);
	const imgExtension = srcValue.split('.').pop()?.toLowerCase();
	const isGif = imgExtension === 'gif';

	return (
		<div className="relative dark:border border-muted overflow-hidden rounded-lg bg-primary-foreground">
			{width > 700 && (
				<LightboxTrigger
					slides={[{
						src   : srcValue,
						width,
						height: Number(props.height) || 600,
						alt   : props.alt || '',
					}]}
				/>)}

			{width <= 700 && (
				<>
					<Image
						alt=""
						sizes="(min-width: 640px) 32rem, 95vw"
						{...props}
						priority={false}
						unoptimized={isGif}
					/>
				</>
			)}

		</div>
	);
};

export function ContentWrapper(
	{
		className,
		...props
	}: React.ComponentPropsWithoutRef<'div'>
) {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
			<div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
				<div
					className={clsx(
						'mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto',
						className,
					)}
					{...props}
				/>
			</div>
		</div>
	);
}


export function ArticleHeader({children, className}: { children: React.ReactNode, className?: string }) {
	return (
		<header className="relative mb-10 xl:mb-0">
			<div className="pointer-events-none absolute top-0 left-[max(-0.5rem,calc(50%-18.625rem))] z-50 flex h-4 items-center justify-end gap-x-2 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:left-0 lg:min-w-lg xl:h-8">
				<div
					className="hidden xl:pointer-events-auto xl:block xl:text-2xs/4 xl:font-medium xl:text-muted"
				>{children}</div>
				<div className="h-0.25 w-3.5 lg:-mr-3.5 xl:mr-0 bg-muted"/>
			</div>
			<ContentWrapper>
				<div className="flex">
					<div
						className="text-2xs/4 font-medium text-muted xl:hidden"
					>{children}</div>
				</div>
			</ContentWrapper>
		</header>
	);
}


export const article = function Article(
	{
		id,
		date,
		children,
		className
	}: {
		id: string
		date?: string | Date
		children: React.ReactNode
		className?: string
	}) {
	let heightRef = useRef<React.ComponentRef<'div'>>(null);
	let [heightAdjustment, setHeightAdjustment] = useState(0);

	useEffect(() => {
		if (!heightRef.current) {
			return;
		}

		let observer = new window.ResizeObserver(() => {
			if (!heightRef.current) {
				return;
			}
			let {height} = heightRef.current.getBoundingClientRect();
			let nextMultipleOf8 = 8 * Math.ceil(height / 8);
			setHeightAdjustment(nextMultipleOf8 - height);
		});

		observer.observe(heightRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<article
			id={id}
			className={clsx("scroll-mt-16", className)}
			style={{paddingBottom: `${heightAdjustment}px`}}
		>
			<div ref={heightRef}>
				{date && (
					<ArticleHeader>
						<FormattedDate date={date}/>
					</ArticleHeader>
				)}
				<ContentWrapper className="typography" data-mdx-content>
					{children}
				</ContentWrapper>
			</div>
		</article>
	);
};

export const code = function Code(
	{
		highlightedCode,
		...props
	}: React.ComponentPropsWithoutRef<'code'> & { highlightedCode?: string }) {
	if (highlightedCode) {
		return (
			<code {...props} dangerouslySetInnerHTML={{__html: highlightedCode}}/>
		);
	}

	return <code {...props} />;
};

export const IconedHeading = function IconedHeading(
	{
		icon,
		level = 'h2',
		children,
		className,
		iconClassName,
		...props
	}: {
		icon: 'command' | 'blocks' | 'confetti';
		level?: 'h1' | 'h2' | 'h3';
		children: React.ReactNode;
		className?: string;
		iconClassName?: string;
	} & React.ComponentPropsWithoutRef<'div'>) {
	// Predefined icon mapping
	const iconMap = {
		command : Command,
		blocks  : Blocks,
		confetti: PartyPopper,
	};

	const IconComponent = iconMap[icon];
	const HeadingComponent = level;

	return (
		<div className={clsx("flex items-center gap-2 mt-10!", className)} {...props}>
			{IconComponent && <IconComponent className={
				clsx("size-4 flex-shrink-0", iconClassName)
			}/>}

			<HeadingComponent className="m-0! leading-none!">
				{children}
			</HeadingComponent>
		</div>
	);
};

export const components = {
	a,
	img,
	code,
	article,
	IconedHeading,
	ImageGallery
};
