import {useId} from 'react';

import {Command} from 'lucide-react';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
	let id = useId();

	return (
		<div className={"flex items-center gap-1 text-2xl text-primary"}>
			<Command className="size-6 text-accent-1"/>
			<b>OutreachStud.io<sup className={"text-[10px] font-mono font-extralight align-middle"}>alpha</sup></b>
		</div>
	);
}
