import * as React from "react";
import { HorizontalAlignment, VerticalAlignment } from "../../utilities/layoutHelpers";
export interface IGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** (boolean) Wether to render borders around grid parts */
    debugMode?: boolean;
    /** (string) CSS className property */
    className?: string;
    /** (boolean) Wether the table should expand and divide to fill its container */
    fillContainer?: boolean;
    /** (string) An HTML tag to use for the root element instead of <div> */
    tagName?: keyof React.ReactHTML;
    /** (Row[]) A row must contain one or many <Row/> elements */
    children?: React.ReactElement<IRowProps> | Array<React.ReactElement<IRowProps>>;
}
export declare const GridRef: React.RefForwardingComponent<{}, IGridProps>;
export declare const Grid: React.ForwardRefExoticComponent<IGridProps & React.RefAttributes<{}>>;
export interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** (number | string) Sets a fixed height for the row, or 'auto' to grow to fit its content */
    height?: number | string;
    /** (string) CSS className property */
    className?: string;
    /** (string) An HTML tag to use for the root element instead of <div> */
    tagName?: string;
    /** (Col[]) A row must contain one or many <Col/> elements */
    children?: React.ReactElement<IColProps> | Array<React.ReactElement<IColProps>>;
}
export declare const Row: React.FC<IRowProps>;
export interface IColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** (HorizontalAlignment(string)) How to align content horizontally in this column */
    horizontalAlignment?: HorizontalAlignment;
    /** (HorizontalAlignment(string)) How to align content vertically in this column */
    verticalAlignment?: VerticalAlignment;
    /** (number | string) Sets a fixed width for the column, or 'auto' to grow to fit its content */
    width?: number | string;
    /** (string) An HTML tag to use for the root element instead of <div> */
    tagName?: string;
    /** (string) CSS className property */
    className?: string;
}
export declare const Col: React.FC<IColProps>;
