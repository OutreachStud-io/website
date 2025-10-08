import Image from 'next/image';
import LogoSVG from '@/../public/media/images/logo.svg';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<div className={"flex items-center gap-1 text-2xl text-primary"}>
			<Image
				priority
				src={LogoSVG}
				alt="Follow us on Twitter"
				className={"size-5 opacity-80 w-[250px] h-[22.24px]"}
			/>
		</div>
	);
}
