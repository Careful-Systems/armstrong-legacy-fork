import * as React from "react";
export interface ITagInput {
    focus: () => void;
    blur: () => void;
    select: () => void;
}
export interface ITagInputProps extends React.HTMLAttributes<HTMLElement> {
    /** Preset list of tags to pick from */
    suggestions?: string[];
    /** Event that fires when tag collection changes */
    onTagsChange?: (tags: string[], changedTag: string, changeType: "add" | "remove" | "set") => void;
    /** The current array of tags */
    value?: string[];
    /** Adds a label above the input */
    label?: string;
}
export declare const TagInput: React.ForwardRefExoticComponent<ITagInputProps & React.RefAttributes<ITagInput>>;
