interface ExternalLinkPropsType {
  children?: any
  href: string
  className?: string
  title?: string
}

export default function ExternalLink({ children, href, className, title }: ExternalLinkPropsType) {
  return (
    <a href={href} target="_blank" className={className} title={title}>
      {children}
    </a>
  )
}
