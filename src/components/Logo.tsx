import {useId} from 'react';
import Image from 'next/image';
import LogoSVG from '@/media/images/logo-small.svg';
import {SiteTitle} from "../../constants";

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	let id = useId();

	return (
		<div className={"flex items-center gap-1 text-2xl text-primary"}>
			<Image
				priority
				src={LogoSVG}
				alt="Follow us on Twitter"
				className={"size-5 opacity-80"}
			/>
			<b>OutreachStud.io<sup className={"text-[10px] font-mono font-extralight align-middle"}>alpha</sup></b>
		</div>
	);
}
