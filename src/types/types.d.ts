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

export type Quote = {
    TITLE: string;
    SUBTITLE: string;
    DESCRIPTION: string;
    INSTRUCTIONS: string;
    BUTTON: string;
    POINTS: string[];
    FORM: {
        NAME: {
            LABEL: string;
            PLACEHOLDER: string;
        };
        EMAIL: {
            LABEL: string;
            PLACEHOLDER: string;
        };
        COMPANY: {
            LABEL: string;
            PLACEHOLDER: string;
        };
        PHONE: {
            LABEL: string;
            PLACEHOLDER: string;
        };
        MESSAGE: {
            LABEL: string;
            PLACEHOLDER: string;
        };
    };
}