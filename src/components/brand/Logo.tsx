/* eslint-disable @next/next/no-img-element */
// Use the SVG, not a PNG (brand guide). Minimum 120 px wide for the horizontal lockup.
export function Logo({ variant = "reversed", width = 156 }: { variant?: "reversed" | "color"; width?: number }) {
  return <img src={`/logo/connectatom-horizontal-${variant}.svg`} alt="ConnectAtom" width={width} height={Math.round((width * 108) / 452)} style={{ height: "auto", width }} />;
}
export function LogoIcon({ size = 28, variant = "reversed" }: { size?: number; variant?: "reversed" | "color" }) {
  return <img src={`/logo/connectatom-icon-${variant}.svg`} alt="ConnectAtom" width={size} height={size} />;
}
