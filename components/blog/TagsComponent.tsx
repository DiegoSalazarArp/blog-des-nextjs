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

export default function TagsComponent({ categoryTitle }: BadgeProps) {
  const variant =
    categoryTitle === "life"
      ? BadgeVariant.DEFAULT
      : categoryTitle === "info"
        ? BadgeVariant.SECONDARY
        : categoryTitle === "tech"
          ? BadgeVariant.DESTRUCTIVE
          : BadgeVariant.OUTLINE;
  return (
    <div className={`${badgeVariants({ variant })} gap-2`}>
      {categoryTitle}
    </div>
  )
}