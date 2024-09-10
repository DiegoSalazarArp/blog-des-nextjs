interface BannerTitleProps {
  className?: string
  title: string
}

export default function BannerTitle({ className, title }: BannerTitleProps) {
  return (
    <div className={`${className} glitch uppercase relative tracking-tight`}>
      {title}
      <span className="absolute top-0 left-0">{title}</span>
      <span className="absolute top-0 left-0">{title}</span>
    </div>
  )
}