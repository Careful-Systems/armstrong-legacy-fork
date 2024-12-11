import * as React from "react";
export declare const GO_LEFT_PAGE_INDEX = -1;
export declare const GO_RIGHT_PAGE_INDEX = -2;
export declare type TDirection = "left" | "right";
export interface IPaginateButtonProps {
    active: boolean;
    index: number;
    onClick: (i: number) => void;
    direction?: TDirection;
}
interface ITablePagination {
    currentPage: number;
    pageNeighbours?: number;
    render: React.FC<{
        index: number;
        direction?: TDirection;
    }>;
    totalPages: number;
}
export declare const TablePagination: React.FunctionComponent<ITablePagination>;
export {};
