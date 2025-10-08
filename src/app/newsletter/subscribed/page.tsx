import {Logo} from "@/components/Logo";
import {ArrowUpRightIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import * as React from "react";

export default function Page() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="default">
					<Logo withLink={true} className={"w-auto! h-6"}/>
				</EmptyMedia>

				<EmptyTitle className={"text-primary"}>Subscribed!</EmptyTitle>
				<EmptyDescription>
					You have successfully subscribed to our newsletter. Nice things are coming
					your way soon.
				</EmptyDescription>
			</EmptyHeader>

			<Button
				variant="link"
				asChild
				className="text-muted-foreground"
				size="sm"
			>
				<a href="/" className={"underline hover:text-primary"}>
					Return to homepage <ArrowUpRightIcon className="inline h-4 w-4"/>
				</a>
			</Button>
		</Empty>
	);
}
