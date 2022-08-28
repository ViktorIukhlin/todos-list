import ICONS, { SupportedIcon, IconType } from "./data";
import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  /** The name of the icon */
  icon: SupportedIcon;
  /** Width and height, in pixels, of the svg element */
  size?: number;
  /** Additional classes to add to the svg element */
  className?: string;
}

/**
 * Renders a given icon as an inline `<svg />` element.
 *
 * To add a new icon, first convert `svg` to react component
 * using `https://react-svgr.com/playground/`
 * and save it in an `.tsx` file under `src/UI/Icon/icons/`.
 *
 * In order to support multiple colors - replace
 *  - `fill=*` attribute with `className="fill-current"`
 *  - `stroke=*` attribute with `className="stroke-current"`
 *
 * Finally, import the `{icon}.tsx` file and add it to `ICONS` object in
 * `src/UI/Icon/data.tsx`.
 */
export default function Icon({
  icon,
  size = 24,
  className,
  ...rest
}: IconProps): JSX.Element {
  const IconEl: IconType = ICONS[icon] || ICONS.placeholder;
  return <IconEl width={size} height={size} className={className} {...rest} />;
}

export type { SupportedIcon, IconProps };
