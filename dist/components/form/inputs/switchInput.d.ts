import * as React from "react";
import { IconOrJsx } from "../../display/icon";
export interface ISwitchInput {
    focus: () => void;
    blur: () => void;
}
export interface ISwitchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** if enabled, the switch will nudge across a bit when hovered to provide a visual cue — Set with css variable --armstrong-switch-hover-nudge-amount */
    hoverNudgeAmount?: number;
    /** width of the switch track - 50 by default — Set with css variable --armstrong-switch-width */
    width?: number;
    /** height of the switch track - 25 by default — Set with css variable --armstrong-switch-height */
    height?: number;
    /** padding of the switch track (if negative, the nubbin will be bigger than the track) - 2px by default — Set with css variable --armstrong-switch-padding */
    padding?: number;
    /** colour of the switch track when inactive — Set with css variable --armstrong-switch-inactive-colour */
    inactiveColour?: string;
    /** colour of the switch track when hovering — Set with css variable --armstrong-switch-hover-colour */
    hoveringColour?: string;
    /** colour of the switch track when active — Set with css variable --armstrong-switch-active-colour */
    activeColour?: string;
    /** colour of the nubbin when inactive - Set with css variable --armstrong-switch-nubbin-inactive-colour */
    inactiveNubbinColour?: string;
    /** colour of the nubbin when inactive - Set with css variable --armstrong-switch-nubbin-inactive-colour */
    hoveringNubbinColour?: string;
    /** colour of the nubbin when active - Set with css variable --armstrong-switch-nubbin-active-colour */
    activeNubbinColour?: string;
    /** if set to true, the nubbin will have a 1px border in the current colour of the switch */
    borderedNubbin?: boolean;
    /** grey out the switch and stop it from being interactible */
    disabled?: boolean;
    /** icon to show on the nubbin when the value of checked is true, accessed via Icon.[IconSet].[IconName] or by passing in some JSX */
    activeIcon?: IconOrJsx;
    /** icon to show on the nubbin when the value of checked is false, accessed via Icon.[IconSet].[IconName] or by passing in some JSX */
    inactiveIcon?: IconOrJsx;
    /** where to render the icon - defalults to on-nubbin */
    iconStyle?: "on-nubbin" | "is-nubbin" | "static";
    /** size of the icon as a proportion of the size of the nubbin (from 0 to 1), if activeIcon or inactiveIcon are set, defaults to 0.8 — Set with css variable --armstrong-switch-icon-size */
    iconSize?: number;
    /** renders shadows around the nubbin and inset into the track — true by default */
    renderShadows?: boolean;
    /** Adds a label above the input */
    label?: string;
}
/** Renders a switch which behaves like a checkbox with many visual customisation options. Falls back to a checkbox in older browsers. */
export declare const SwitchInput: React.ForwardRefExoticComponent<ISwitchInputProps & React.RefAttributes<ISwitchInput>>;
