/**
 * Custom Sequelize validator: the value must be an absolute HTTPS URL.
 * HU-07 / HU-10: external links must use HTTPS.
 */
export function isHttpsUrl(value: unknown): void {
    let url: URL;

    try {
        url = new URL(String(value));
    } catch {
        throw new Error("url must be a valid URL");
    }

    if (url.protocol !== "https:") {
        throw new Error("url must use HTTPS");
    }
}
