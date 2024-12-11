import * as React from "react";
interface IProgressBarProps {
    /** the progress of the bar from 0 to 100 */
    progress: number;
    /** the direction for the loading to increase */
    direction?: "left" | "right" | "down" | "up";
    /** the text to optionally display as a label */
    labelText?: string;
    /** the position to show the label - defaults to centre */
    labelVariant?: "centre" | "following";
    /** the thickness of the loading bar */
    thickness?: string;
    /** initial colour when progress is at 0 - will fade to endColour (both must be set) */
    startColor?: string;
    /** end colour as progress approaches 100 - will fade from startColour (both must be set) */
    endColor?: string;
    /** colour when the progress has hit 100 */
    completeColor?: string;
    className?: string;
}
/** A simple progress bar that takes a progress prop between 0 and 100 */
export declare const ProgressBar: React.FunctionComponent<IProgressBarProps>;
interface IAutoProgressBarProps extends Omit<IProgressBarProps, "progress" | "labelText"> {
    /** */
    labelText?: (progress: number) => string;
    /** the time in ms to add to the remaining progress — defaults to 300 */
    increaseInterval?: number;
    /** the proportion of the remaining progress to add each time - defaults to 0.3 */
    increaseProportion?: number;
    /** the maximum the progress can be out of 100 if the content hasn't loaded yet (the asymptote of the progress / time curve function) - defaults to 90 */
    maxProgressBeforeLoaded?: number;
    /** will fill the loading bar */
    loaded?: boolean;
    /** should be filling the loading bar */
    loading?: boolean;
}
/**
 * A progress bar which wraps the Armstrong ProgressBar component, where the progress is faked.
 * Allows visual feedback for requests where progress isn't actually known. The progress increases by a defined proportion of the remaining progress, never reaching 100%, until the prop loaded is set
 */
export declare const AutoProgressBar: React.FunctionComponent<IAutoProgressBarProps>;
export {};
