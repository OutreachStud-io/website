import {FixedSidebar, Timeline} from "@/components/layouts/Main";
import {Logo} from "@/components/Logo";
import {Nav} from "@/components/Nav";
import {Intro, IntroFooter} from '@/components/Intro';
import * as React from "react";


export function Layout({children}: { children: React.ReactNode }) {
	return (
		<>
			<FixedSidebar main={<Intro/>} footer={<IntroFooter/>} header={<Logo
				withLink={true} className={"w-auto! h-6 mx-auto mt-10 lg:mt-0 lg:mx-0"}
			/>}/>

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
