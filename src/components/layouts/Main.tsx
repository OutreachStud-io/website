import * as React from "react";
import {Logo} from "@/components/Logo";
import {Nav} from "@/components/Nav";
import Link from "next/link";
import {useId} from 'react';

import {Intro, IntroFooter} from '@/components/Intro';
import {StarField} from '@/components/StarField';

export function Timeline() {
	let id = useId();

	return (
		<div className="pointer-events-none border-r absolute inset-0 z-50 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-lg lg:overflow-visible">
			<svg
				className="absolute top-0 left-[max(0px,calc(50%-18.125rem))] h-full w-1.5 lg:left-full lg:ml-1 xl:right-1 xl:left-auto xl:ml-0"
				aria-hidden="true"
			>
				<defs>
					<pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
						<path
							d="M0 0H6M0 8H6" className="stroke-border" fill="none"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill={`url(#${id})`}/>
			</svg>
		</div>
	);
}

function Glow() {
	let id = useId();

	return (
		<div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-lg">
			<svg
				className="absolute -bottom-48 left-[-40%] h-320 w-[180%] lg:top-[-40%] lg:-right-40 lg:bottom-auto lg:left-auto lg:h-[180%] lg:w-7xl"
				aria-hidden="true"
			>
				<defs>
					<radialGradient id={`${id}-desktop`} cx="100%">
						<stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)"/>
						<stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)"/>
						<stop offset="100%" stopColor="rgba(10, 14, 23, 0)"/>
					</radialGradient>
					<radialGradient id={`${id}-mobile`} cy="100%">
						<stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)"/>
						<stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)"/>
						<stop offset="100%" stopColor="rgba(10, 14, 23, 0)"/>
					</radialGradient>
				</defs>
				<rect
					width="100%"
					height="100%"
					fill={`url(#${id}-desktop)`}
					className="hidden lg:block"
				/>
				<rect
					width="100%"
					height="100%"
					fill={`url(#${id}-mobile)`}
					className="lg:hidden"
				/>
			</svg>
			<div className="absolute inset-x-0 right-0 bottom-0 h-px bg-white mix-blend-overlay lg:top-0 lg:left-auto lg:h-auto lg:w-px"/>
		</div>
	);
}

export function FixedSidebar(
	{
		main,
		header,
		footer,
	}: {
		main: React.ReactNode
		header: React.ReactNode
		footer: React.ReactNode
	}) {
	return (
		<div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0 ">
			<div className="absolute border-b lg:hidden bg-background-darker inset-0"></div>

			<div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-lg lg:overflow-x-hidden lg:overflow-y-auto lg:pl-[max(4rem,calc(50%-38rem))]">
				<div className="-z-1 hidden xl:block absolute bg-background-darker inset-0"></div>

				<div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-110 lg:max-w-none lg:flex-col">
					<div className="flex flex-1 items-end pt-14">
						{header}
					</div>

					<div className="relative">
						<StarField className="top-14 -right-44 -z-1"/>
						{main}
					</div>

					<div className="flex flex-1 items-start justify-center pb-4 lg:pb-6">
						{footer}
					</div>
				</div>
			</div>
		</div>
	);
}


export function Layout({children}: { children: React.ReactNode }) {
	return (
		<>
			<FixedSidebar
				main={<Intro/>}
				footer={<IntroFooter/>}
				header={<Logo withLink={true} className={"w-auto! h-6 mx-auto mt-10 lg:mt-0 lg:mx-0"}/>}
			/>

			<Nav/>

			<div className="relative flex-auto">
				<Timeline/>

				<main className="space-y-20 py-20 sm:space-y-32 sm:py-32">
					{children}
				</main>
			</div>
		</>
	);
}
