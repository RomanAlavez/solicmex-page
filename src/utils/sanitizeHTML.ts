
export const configSafeDescription = {
  allowedTags: [
    "p","br","b","strong","i","em","u","s","del","mark","small","sub","sup",
    "h2","h3","h4","h5","h6",
    "ul","ol","li",
    "blockquote","pre","code",
    "a","hr",
    "table","thead","tbody","tr","th","td",
    "figure","figcaption"
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
    code: ["class"],
    pre: ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: (tagName, attribs) => {
      const isExternal =
        attribs.href &&
        !attribs.href.startsWith("/") &&
        !attribs.href.startsWith("#");

      return {
        tagName: "a",
        attribs: {
          ...attribs,
          target: isExternal ? "_blank" : undefined,
          rel: isExternal ? "noopener noreferrer" : undefined,
        },
      };
    },
  }
};