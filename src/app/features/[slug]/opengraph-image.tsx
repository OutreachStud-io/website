import {getPost} from "@/actions/pagination";
import {ImageResponse} from 'next/og';

import {calculateAspectRatioFit} from "@/lib/utils";

const size = {
	width : 1200,
	height: 480
};

export default async function Image({params}: { params: { slug: string } }) {
	const post = await getPost(params.slug, "features");

	if (!post) {
		// return default image
		return new ImageResponse(
			(
				<div
					style={{
						fontSize      : 48,
						background    : 'white',
						width         : '100%',
						height        : '100%',
						display       : 'flex',
						alignItems    : 'center',
						justifyContent: 'center',
					}}
				>
					Feature Not Found
				</div>
			),
			{
				...size,
			}
		);
	}

	if (post && post.hero && post.hero.src) {
		const {width, height} = calculateAspectRatioFit(post.hero.width, post.hero.height, 1200);
		// Use the hero image if available
		return new ImageResponse(
			(
				<img
					src={`${process.env.NEXT_PUBLIC_SITE_URL}/${post.hero.src}`}
					alt={post.title}
				/>
			),
			{
				height: height,
				width : width,
			}
		);
	}


	return new ImageResponse(
		(
			<div
				style={{
					fontSize          : 48,
					backgroundImage   : `url(${process.env.NEXT_PUBLIC_SITE_URL}/media/images/og-bg.png)`,
					backgroundPosition: "center",
					backgroundRepeat  : "no-repeat",
					backgroundSize    : "100% 100%",
					width             : '100%',
					height            : '100%',
					display           : 'flex',
					alignItems        : 'center',
					justifyContent    : 'center',
				}}
			>
				{post.title}
			</div>
		),
		{
			...size,
		}
	);
}
