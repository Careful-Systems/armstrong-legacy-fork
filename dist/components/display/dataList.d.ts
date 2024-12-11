import * as React from "react";
export interface IDataListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The maximum distance in pixels you can pull down from the top of the list */
    maxDistance?: number;
    /** The distance in pixels you need to pull down before triggering the refresh action */
    refreshThreshold?: number;
    /** An artifical delay in milliseconds after fetching, useful for fast or local queries */
    postRefreshDelayMs?: number;
    /** Wether or not the list should be in the 'refreshing' state */
    refreshing?: boolean;
    /** If true, the list items won't be rendered while refreshing */
    hideChildrenWhileRefreshing?: boolean;
    /** The function to call to refresh your data */
    refreshData: () => void;
    /** A custom react component to show while refreshing */
    refreshingComponent?: JSX.Element;
    /** Skips showing refreshing UI for first fetch */
    skipFirstFetch?: boolean;
    /** Callback to run when the list is scrolled to the bottom - use for infinite paging */
    onScrollToBottom?: () => void;
    /** If onScrollToBottom is provided, the distance in px from the bottom of the screen to run that callback */
    scrollToBottomRootMargin?: number;
}
export declare const DataList: React.FunctionComponent<IDataListProps>;
