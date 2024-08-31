import Link from "next/link";
import { badgeVariants } from "../ui/badge";

type BadgeProps = {
  categoryTitle: string;
};

enum BadgeVariant {
  DEFAULT = "default",
  SECONDARY = "secondary",
  DESTRUCTIVE = "destructive",
  OUTLINE = "outline",
}

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
