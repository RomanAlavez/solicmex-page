export interface ArticleBlog {
    ID: string;
    TITLE: string;
    DESCRIPTION: string;
    IMAGES: string[];
    TAGS: string[];
    DATE: string;
    LINK?: string;
}
export type PrevService = {
    NAME: string;
    ICON: string;
};

export type Project = {
    ID: string;
    NAME: string;
    DESCRIPTION: string;
    IMAGES: string[];
    APP: string;
}