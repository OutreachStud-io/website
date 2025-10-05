import {FixedSidebar, Timeline} from "@/components/layouts/Main";
import {Logo} from "@/components/Logo";
import {Nav} from "@/components/Nav";
import Link from "next/link";
import {Intro, IntroFooter} from '@/components/Intro';


export function Layout({children}: { children: React.ReactNode }) {
	return (
		<>
			<FixedSidebar main={<Intro/>} footer={<IntroFooter/>} header={<Link href="/">
				<Logo className="inline-block h-8 w-auto mx-auto"/>
			</Link>}/>

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
