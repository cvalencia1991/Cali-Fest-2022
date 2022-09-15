export interface Manifest {
    background_color?: string;
    dir?: "ltr" | "rtl" | "auto";
    display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    icons?: ManifestImageResource[];
    lang?: string;
    name?: string;
    orientation?: "any" | "natural" | "landscape" | "portrait" | "portrait-primary" | "portrait-secondary" | "landscape-primary" | "landscape-secondary";
    prefer_related_applications?: boolean;
    related_applications?: ExternalApplicationResource[];
    scope?: string;
    short_name?: string;
    shortcuts?: ShortcutItem[];
    start_url?: string;
    theme_color?: string;
    id?: string;
    categories?: string[];
    description?: string;
    iarc_rating_id?: string;
    screenshots?: ManifestImageResource[];
    share_target?: {
        action: string;
        method?: "GET" | "POST" | "get" | "post";
        enctype?: "application/x-www-form-urlencoded" | "multipart/form-data" | "APPLICATION/X-WWW-FORM-URLENCODED" | "MULTIPART/FORM-DATA";
        params: {
            title?: string;
            text?: string;
            url?: string;
            files?: ShareTargetFiles | ShareTargetFiles[];
        };
    };
}
export interface ManifestImageResource {
    sizes?: string | "any";
    src: string;
    type?: string;
    purpose?: "monochrome" | "maskable" | "any" | "monochrome maskable" | "monochrome any" | "maskable monochrome" | "maskable any" | "any monochrome" | "any maskable" | "monochrome maskable any" | "monochrome any maskable" | "maskable monochrome any" | "maskable any monochrome" | "any monochrome maskable" | "any maskable monochrome";
}
export interface ExternalApplicationResource {
    platform: "chrome_web_store" | "play" | "itunes" | "windows";
    url?: string;
    id?: string;
    min_version?: string;
    fingerprints?: {
        type?: string;
        value?: string;
    }[];
}
export interface ShortcutItem {
    name: string;
    short_name?: string;
    description?: string;
    url: string;
    icons?: ManifestImageResource[];
}
export interface ShareTargetFiles {
    name: string;
    accept: string | string[];
}
//# sourceMappingURL=schema.d.ts.map