import type { SVGProps } from 'react'

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.5} />
      <path d="m15 9-6 6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path d="m9 9 6 6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

export function ExpandIcon({ open, ...props }: SVGProps<SVGSVGElement> & { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        className={`origin-center transition-transform duration-300 ${open ? 'scale-y-0' : 'scale-y-100'}`}
      />
    </svg>
  )
}
