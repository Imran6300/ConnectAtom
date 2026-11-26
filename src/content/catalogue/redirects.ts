import type { Redirect } from "@/lib/catalogue/types";
// Retired or merged URLs. Each entry becomes a permanent redirect to the single best replacement, never the home page.
// Slugs are fixed once published; when a record's slug changes, add the old path here (or into the MongoDB `redirects` collection).
const redirects: Redirect[] = [];
export default redirects;
