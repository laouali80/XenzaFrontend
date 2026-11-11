// This utility provides a type-safe way to access i18next translations with autocomplete support in TypeScript.

import { useTranslation } from "react-i18next";
import en from "../../i18next/locales/en";

type NestedPaths<T> = T extends string
  ? string
  : { [K in keyof T]: NestedPaths<T[K]> };

// Creates a deeply nested object path tracker using JavaScript Proxies
function createProxy(t: (key: string) => string, path: string[] = []): any {
  return new Proxy(
    {},
    {
      get(_, prop: string) {
        // If it's a special JS symbol, return undefined
        if (typeof prop === "symbol") return undefined;

        const currentPath = [...path, prop];

        const enValue = currentPath.reduce(
          (value, key) => value?.[key],
          en.translation as any,
        );

        if (enValue !== undefined && typeof enValue === "object") {
          return createProxy(t, currentPath);
        }

        if (typeof enValue === "string") {
          return t(currentPath.join("."));
        }

        return currentPath.join(".");
      },
    },
  );
}

export function useTx() {
  const { t } = useTranslation();
  // Cast the proxy to match your exact English object structure for perfect IDE autocomplete
  const tx = createProxy(t) as NestedPaths<typeof en.translation>;
  return tx;
}
