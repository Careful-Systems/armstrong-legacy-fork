import * as React from "react";
export interface ITabControlProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The index of the tab selected when the control renders. Defaults to 0 */
    defaultSelectedIndex?: number;
    /** The index of the tab selected. Use this if you want a stateless component */
    forceSelectedIndex?: number;
    /** The tab items. Controls the header and the content */
    children?: React.ReactElement<ITabItemProps> | Array<React.ReactElement<ITabItemProps>>;
    /** Fires when the tab is changed by the user */
    onTabChanged?: (index: number) => void;
    /** Wether to align the tabs to the right or left of the header. Defaults to left */
    tabAlignment?: "left" | "right";
}
export declare const TabControl: (props: ITabControlProps) => JSX.Element;
export interface ITabItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** (string (Icomoon)) An optional icon to show to the left of the title in the tab header */
    icon?: string;
}
export declare const TabItem: React.FC<ITabItemProps>;
