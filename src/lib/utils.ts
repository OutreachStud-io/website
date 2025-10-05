import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function calculateAspectRatioFit(
	srcWidth: number,
	srcHeight: number,
	maxWidth?: number,
	maxHeight?: number
): { width: number; height: number } {
	if (!maxWidth && !maxHeight) {
		throw new Error('Either maxWidth or maxHeight must be provided');
	}

	if (maxWidth && maxHeight) {
		const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
		return {width: srcWidth * ratio, height: srcHeight * ratio};
	}

	if (maxWidth) {
		const ratio = maxWidth / srcWidth;
		return {width: maxWidth, height: srcHeight * ratio};
	}

	if (maxHeight) {
		const ratio = maxHeight / srcHeight;
		return {width: srcWidth * ratio, height: maxHeight};
	}

	return {width: srcWidth, height: srcHeight};
}
