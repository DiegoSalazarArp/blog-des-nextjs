import Link from "next/link";
import { badgeVariants } from "../ui/badge";

type BadgeProps = {
  categoryTitle: string;
};

export enum BadgeVariant {
  DEFAULT = "default",
  SECONDARY = "secondary",
  DESTRUCTIVE = "destructive",
  OUTLINE = "outline",
}

/**
 * Renders a badge component based on the provided category title.
 *
 * @param {BadgeProps} props - The props for the BadgeComponent.
 * @param {string} props.categoryTitle - The title of the category.
 * @returns {JSX.Element} The rendered badge component.
 */
export default function BadgeComponent({ categoryTitle }: BadgeProps) {
  const variant =
    categoryTitle === "life"
      ? BadgeVariant.DEFAULT
      : categoryTitle === "info"
        ? BadgeVariant.SECONDARY
        : categoryTitle === "tech"
          ? BadgeVariant.DESTRUCTIVE
          : BadgeVariant.OUTLINE;
  return (
    <Link href={`tags/${categoryTitle}`} className={badgeVariants({ variant })}>
      {categoryTitle}
    </Link>
  );
}
