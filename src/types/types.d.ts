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
    UBICATION: string;
    APP: string;
}
export interface SocialLinks {
    FACEBOOK?: string;
    INSTAGRAM?: string;
    LINKEDIN?: string;
}

export interface ContactInfo {
    EMAIL: string;
    PHONE: string;
    ADDRESS: string;
    SOCIAL?: SocialLinks;
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

export type Services = {
    TITLE: string;
    SERVICES_LIST: Service[];
}

export type Service = {
    NAME: string;
    SHORT_DESCRIPTION: string;
    DESCRIPTION: string;
    HIGHLIGHTS: string[];
    STATS: {
        value: string;
        label: string;
    }[]
    ICON: string;
}

