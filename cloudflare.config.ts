import { bindings, defineConfig, defineWorker } from "cf/config";
import { createWorkersResponseStoreServiceBindingConfig } from "@vinext/cloudflare/cache/config";

const responseStore = await createWorkersResponseStoreServiceBindingConfig({
  worker: {
    name: "connectatom-web-response-store",
    compatibilityDate: "2026-11-23",
  },
  bucket: "connectatom-web-response-store-cache-bodies",
});

export const responseStoreServiceBinding = responseStore.serviceBindingWorker;

export default defineConfig({
  worker: defineWorker({
    ...responseStore.applicationWorker,
    name: "connectatom-web",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-23",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
  ...responseStore.applicationWorker.env,
  ASSETS: bindings.assets(),
  IMAGES: bindings.images(),
  NEXT_PUBLIC_SITE_URL: "https://connectatom.com",
  NEXT_PUBLIC_LEGAL_REVIEWED: "true",
  NEXT_PUBLIC_GA_DEBUG: "false",
},
  }),
});
