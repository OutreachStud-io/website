import {MediaWrapper} from "@/components/MediaWrapper";
import React from "react";

import {
	ReactCompareSlider,
	ReactCompareSliderImage,
	ReactCompareSliderImageProps,
	useReactCompareSliderRef
} from 'react-compare-slider';

// mdx usage:
// {/* display:compare options:{"preview": true} */}
// ![Campaign status icons](@/media/images/theme-drk.png)
// ![Campaign status icons](@/media/images/theme-light.png)
export interface ImageCompareSliderOptions {
	preview?: boolean;// shows a little animation previewing the compare effect
	position?: number;// initial position of the slider (0-100)
}

export const ImageCompareSlider = (
	{
		imageOne, imageTwo, options, ...rest
	}: {
		imageOne: ReactCompareSliderImageProps;
		imageTwo: ReactCompareSliderImageProps;
		options?: ImageCompareSliderOptions;
	}
) => {
	const reactCompareSliderRef = useReactCompareSliderRef();

	React.useEffect(() => {
		const fireTransition = async () => {
			await new Promise(resolve => setTimeout(() => {
				reactCompareSliderRef.current?.setPosition(90);
				resolve(true);
			}, 750));

			await new Promise(resolve => setTimeout(() => {
				reactCompareSliderRef.current?.setPosition(10);
				resolve(true);
			}, 750));

			await new Promise(resolve => setTimeout(() => {
				reactCompareSliderRef.current?.setPosition(options?.position || 50);
				resolve(true);
			}, 750));
		};

		if (options && options.preview) fireTransition().catch(console.error);
	}, [options?.preview]);

	return (
		<MediaWrapper>
			<ReactCompareSlider
				ref={reactCompareSliderRef}
				itemOne={<ReactCompareSliderImage {...imageOne}/>}
				itemTwo={<ReactCompareSliderImage {...imageTwo}/>}
				transition={".75s ease-in-out"}
				position={options?.position || 50}
				{...rest}
			/>
		</MediaWrapper>
	);
};
