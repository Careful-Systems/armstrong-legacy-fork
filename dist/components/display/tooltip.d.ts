import * as React from "react";
export declare type ITooltipPosition = "left" | "right" | "top" | "bottom" | "fixed" | "hidden";
export declare type ITooltipPositions = ITooltipPosition | ITooltipPosition[];
export declare type ITooltipCustomPositions = string | string[];
export declare type ITooltipPositionPriority = [ITooltipPosition, ITooltipPosition, ITooltipPosition, ITooltipPosition, ITooltipPosition, ITooltipPosition];
export interface ITooltipProps {
    /** (JSX.Element | string) The content to appear on hover.  Passing a string will apply it as an aria-label to children, if ariaLabel not passed */
    tooltip: JSX.Element | string;
    /** (JSX.Element) The content that causes the tooltip to appear when hovered. */
    children: JSX.Element;
    /** (boolean) Retain tooltip when tooltip is hovered, default false */
    retain?: boolean;
    /** (boolean) Never show tooltip, default false */
    disable?: boolean;
    /** (Position) Priority order, or just top priority, for tooltip location, default ["right", "left", "bottom", "top", "fixed", "hidden"].  Only for use with preset positions, & appends unspecified positions to user defined list. */
    position?: ITooltipPositions;
    /** (ITooltipCustomPositions) Priority order, or just top priority, for tooltip location.  Overrides position prop.  Can use custom user positions created in css, & preset positions. */
    customPosition?: ITooltipCustomPositions;
    /** (HtmlAttributes) HTML attributes of the tooltip wrapper */
    wrapperAttributes?: React.HTMLAttributes<HTMLElement>;
    /** (HtmlAttributes) HTML attributes of the tooltip children */
    childrenAttributes?: React.HTMLAttributes<HTMLElement>;
    /** (HtmlAttributes) HTML attributes of the tooltip */
    tooltipAttributes?: React.HTMLAttributes<HTMLElement>;
    /** (boolean) centers the tooltip */
    center?: boolean;
    /** (boolean) shows an arrow pointing to the child element */
    withArrow?: boolean;
}
export declare const Tooltip: React.FC<ITooltipProps>;
