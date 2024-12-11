import * as React from "react";
export interface IImageProps extends React.ImgHTMLAttributes<HTMLPictureElement> {
    /** Should the image be circular? */
    rounded?: boolean;
    /** Additional sources - will be set based  */
    alternateSources?: Array<React.HTMLProps<HTMLSourceElement>>;
    /** should the image lazy load */
    lazy?: boolean;
    /** callback to execute when the image enters the viewport */
    onEnterViewport?: (entry: IntersectionObserverEntry) => void;
    /** callback to execute when the image exits the viewport */
    onExitViewport?: (entry: IntersectionObserverEntry) => void;
    /** distance from the edge of the screen to load the image (if lazy loading is enabled) */
    rootMargin?: string;
    /** render a spinner that will centre itself in the img's parent until the image has loaded */
    renderSpinner?: boolean;
    /** override the default spinner to be rendered if renderSpinner is set to true */
    spinnerElement?: JSX.Element;
    /** render an element if there is an error loading the image */
    renderError?: boolean;
    /** the elemnt to render if renderError is set to true and there is an error loading the image */
    errorElement?: JSX.Element;
    /** if renderSpinner is set to true, the amount of time to wait before rendering a spinner in ms (stops the spinner from flashing onto the screen quickly if the image is tiny) - defaults to 500 */
    minimumTimeToSpinner?: number;
}
export declare function useRandomUserImageSrc(sampleUserSeed?: string): string;
export declare function useDummyImageSrc(width: number, height: number): string;
export declare const Image: React.FunctionComponent<IImageProps>;
