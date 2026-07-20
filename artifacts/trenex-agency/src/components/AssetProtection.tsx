/**
 * AssetProtection — mounts the asset-protection listeners for the lifetime
 * of the application. Renders nothing; exists purely for side-effects.
 *
 * Mount once near the root of the component tree (inside App).
 */

import { useAssetProtection } from "@/hooks/useAssetProtection";

export function AssetProtection() {
  useAssetProtection();
  return null;
}
