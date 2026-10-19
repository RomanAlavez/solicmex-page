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
    NOTATION: string;
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
    IMAGE?: string;
}

export type LittleGallery = {

    TITLE: string;
    SUBTITLE: string;

}

export interface Legal {
  PRIVACY: Privacy
  TERMS: Terms
  COOKIES: Cookies2
}

export interface Privacy {
  TITLE: string
  LAST_UPDATED: string
  INTRO: string
  ACCEPTANCE: string
  SECTIONS: Sections
}

export interface Sections {
  RESPONSIBLE: Responsible
  informationCollected: InformationCollected
  GOOGLE_ANALYTICS: GoogleAnalytics
  PURPOSES: Purposes
  cookies: Cookies
  SHARING: Sharing
  SEGURITY: Segurity
  RETENTION: Retention
  USER_RIGHTS: UserRights
  EXTERNAL_LINKS: ExternalLinks
  MODIFICATIONS: Modifications
  CONTACT: Contact
}

export interface Responsible {
  TITLE: string
  CONTENT: string
  contact: string
}

export interface InformationCollected {
  TITLE: string
  INTRO: string
  DIRECT_INFORMATION: string[]
  TECHNICAL_INTRO: string
  TECHNICAL_INFORMATION: string[]
  CLOSING: string
}

export interface GoogleAnalytics {
  TITLE: string
  CONTENT: string
  DATA: string
  PERSONAL_DATA: string
  PURPOSES: string[]
}

export interface Purposes {
  TITLE: string
  INTRO: string
  ITEMS: string[]
  CLOSING: string
}

export interface Cookies {
  TITLE: string
  CONTENT: string
  ANALYTICS: string
  BROWSER: string
  CONSENT: string
}

export interface Sharing {
  TITLE: string
  INTRO: string
  CONTENT: string
  ITEMS: string[]
  CLOSING: string
}

export interface Segurity {
  TITLE: string
  CONTENT: string
  limitation: string
}

export interface Retention {
  TITLE: string
  CONTENT: string
  thirdParty: string
}

export interface UserRights {
  TITLE: string
  CONTENT: string
  CONTACT: string
}

export interface ExternalLinks {
  TITLE: string
  CONTENT: string
  limitation: string
}

export interface Modifications {
  TITLE: string
  CONTENT: string
  EFFECTIVE: string
}

export interface Contact {
  TITLE: string
  CONTENT: string
}

export interface Terms {
  TITLE: string
  LAST_UPDATED: string
  INTRO: string
  ACCEPTANCE: string
  SECTIONS: Sections2
}

export interface Sections2 {
  ABOUT: About
  PERMITTED_USE: PermittedUse
  SERVICES: ServicesTerms
  INTELLECTUAL_PROPERTY: IntellectualProperty
  TECHNICAL_CONTENT: TechnicalContent
  EXTERNAL_LINKS: ExternalLinks2
  AVAILABILITY: Availability
  LIABILITY: Liability
  PRIVACY: Privacy2
  MODIFICATIONS: Modifications2
  applicableLaw: ApplicableLaw
  CONTACT: Contact2
}

export interface About {
  TITLE: string
  CONTENT: string
  PURPOSE: string
}

export interface PermittedUse {
  TITLE: string
  INTRO: string
  PROHIBITED: string[]
}

export interface ServicesTerms {
  TITLE: string
  CONTENT: string
  DISCLAIMER: string
  CONDITIONS: string
}

export interface IntellectualProperty {
  TITLE: string
  CONTENT: string
  RESTRICTION: string
}

export interface TechnicalContent {
  TITLE: string
  CONTENT: string
  PROJECT_SPECIFIC: string
}

export interface ExternalLinks2 {
  TITLE: string
  CONTENT: string
  LIMITATION: string
}

export interface Availability {
  TITLE: string
  CONTENT: string
  suspension: string
}

export interface Liability {
  TITLE: string
  CONTENT: string
  contracts: string
}

export interface Privacy2 {
  TITLE: string
  CONTENT: string
  ANALYTICS: string
}

export interface Modifications2 {
  TITLE: string
  CONTENT: string
  EFFECTIVE: string
}

export interface ApplicableLaw {
  TITLE: string
  CONTENT: string
  JURISDICTION: string
}

export interface Contact2 {
  TITLE: string
  CONTENT: string
}

export interface Cookies2 {
  TITLE: string
  DESCRIPTION: string
  DATA_COLLECTION: string
  PURPOSE: string
  BROWSER_SETTINGS: string
  PRIVACY_LINK: string
  ACTIONS: Actions
}

export interface Actions {
  ACCEPT: string
  REJECT: string
  CONFIGURE: string
}