// HTMLHint doesn't export it's rule set.  Htmlhint just sucks - plan on this being removed
// in version 20.
interface RuleSet {
  "alt-require"?: boolean;
  "attr-lowercase"?: boolean | Array<string | RegExp>;
  "attr-no-duplication"?: boolean;
  "attr-no-unnecessary-whitespace"?: boolean;
  "attr-sorted"?: boolean;
  "attr-unsafe-chars"?: boolean;
  "attr-value-double-quotes"?: boolean;
  "attr-value-not-empty"?: boolean;
  "attr-value-single-quotes"?: boolean;
  "attr-whitespace"?: boolean;
  "doctype-first"?: boolean;
  "doctype-html5"?: boolean;
  "empty-tag-not-self-closed"?: boolean;
  "head-script-disabled"?: boolean;
  "href-abs-or-rel"?: "abs" | "rel";
  "id-class-ad-disabled"?: boolean;
  "id-class-value"?:
    | "underline"
    | "dash"
    | "hump"
    | { regId: RegExp; message: string };
  "id-unique"?: boolean;
  "inline-script-disabled"?: boolean;
  "inline-style-disabled"?: boolean;
  "input-requires-label"?: boolean;
  "script-disabled"?: boolean;
  "space-tab-mixed-disabled"?:
    | boolean
    | "space"
    | "space1"
    | "space2"
    | "space3"
    | "space4"
    | "space5"
    | "space6"
    | "space7"
    | "space8"
    | "tab";
  "spec-char-escape"?: boolean;
  "src-not-empty"?: boolean;
  "style-disabled"?: boolean;
  "tag-pair"?: boolean;
  "tag-self-close"?: boolean;
  "tagname-lowercase"?: boolean;
  "tagname-specialchars"?: boolean;
  "tags-check"?: { [tagName: string]: Record<string, unknown> };
  "title-require"?: boolean;
}

const config: RuleSet = {};
export default config;
