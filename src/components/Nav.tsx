import Link from "next/link";

import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/ThemeToggle";


export function Nav() {
	return (
		<div className={"flex absolute top-4 right-4 z-50 -m-2.5 p-2.5"}>
			<Button variant={"link"} size={"sm"} asChild={true}>
				<Link href="/updates" className={"underline"}>
					Updates
				</Link>
			</Button>

			<Button variant={"link"} size={"sm"} asChild={true}>
				<Link href="/features" className={"underline"}>
					Features
				</Link>
			</Button>

			<Button variant={"link"} size={"sm"} asChild={true} className={"mr-2"}>
				<Link href="/about" className={"underline"}>
					About
				</Link>
			</Button>

			<ThemeToggle/>
		</div>
	);
}
