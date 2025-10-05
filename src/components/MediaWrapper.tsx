import React from "react";
import clsx from "clsx";

export type MediaWrapperProps = {
	className?: string;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>

export const MediaWrapper = (
	p: MediaWrapperProps
) => {
	const {className, children} = p;

	return (
		<div className={
			clsx("relative border border-muted overflow-hidden rounded-lg bg-muted!", className)
		} {...p}>
			{children}
		</div>
	);
};
