import clsx from "clsx";
import * as React from "react";
import Link from "next/link";

export function Logo(props: React.HTMLAttributes<HTMLElement> & { withLink?: boolean }) {
	let {className, withLink, ...rest} = props;

	if (withLink == undefined) {
		withLink = true;
	}

	const Tag = withLink ? Link : 'div' as any;
	const tagProps = withLink ? {href: "/"} : {};

	return (
		<Tag
			className={clsx("inline-block mx-auto text-primary", className)}
			{...tagProps}
			{...rest}
		>
			<svg
				width="503.87689mm"
				height="43.936031mm"
				viewBox="0 0 503.87689 43.936031"
				xmlSpace="preserve"
				xmlns="http://www.w3.org/2000/svg"
				className={"w-full h-full"}
			>
				<g transform="translate(-26.446 -38.56) scale(.43936)" display="inline">
					<rect
						width={100}
						height={100}
						x={60.192783}
						y={87.765511}
						ry={17.366699}
						display="inline"
						opacity={1}
						fill="#1447e6"
						fillOpacity={1}
						strokeWidth={0.264064}
					/>
					<path
						d="M15 6v12c0 2.673 3.231 4.011 5.121 2.121C22.011 18.231 20.673 15 18 15H6c-2.673 0-4.011 3.231-2.121 5.121C5.769 22.011 9 20.673 9 18V6c0-2.673-3.231-4.011-5.121-2.121C1.989 5.769 3.327 9 6 9h12c2.673 0 4.011-3.231 2.121-5.121C18.231 1.989 15 3.327 15 6"
						stroke="#fff"
						strokeWidth={2}
						strokeDasharray="none"
						strokeOpacity={1}
						paintOrder="normal"
						transform="matrix(3.444 0 0 3.444 69.304 96.8)"
						display="inline"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
				<text
					xmlSpace="preserve"
					x={53.260761}
					y={40.429001}
					fontStyle="normal"
					fontVariant="normal"
					fontWeight={400}
					fontStretch="normal"
					fontSize="50.8px"
					fontFamily="PT Sans"
					strokeWidth={0.264583}
					fill={"currentColor"}
				>
					<tspan
						x={53.260761}
						y={40.429001}
						fontStyle="normal"
						fontVariant="normal"
						fontWeight={900}
						fontStretch="normal"
						fontSize="50.8px"
						fontFamily="Inter"
						strokeWidth={0.264583}
						fill={"currentColor"}
					>
						{"OutreachStud.io"}
					</tspan>
				</text>
				<text
					xmlSpace="preserve"
					style={{
						lineHeight: 1.25
					}}
					x={470}
					y={12.894711}
					fontSize="12.7px"
					fontFamily="sans-serif"
					strokeWidth={0.264583}
					fill={"currentColor"}
				>
					<tspan
						x={470}
						y={12.894711}
						fontSize="12.7px"
						strokeWidth={0.264583} fill={"currentColor"}
					>
						{"alpha"}
					</tspan>
				</text>
			</svg>
		</Tag>
	);
}

export default Logo;
