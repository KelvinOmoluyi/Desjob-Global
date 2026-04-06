import React from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  type?: "link" | "button"
  text: string
  link?: string
  icon?: React.ReactNode
  ariaLabel?: string
  onClick?: () => void
}

const ButtonPrimarySmall = ({type = "link", text, link, icon, ariaLabel, onClick}: ButtonProps) => {
  return (
    <>
      {type === "button" ? (
        <button
          className="btn-01"
          aria-label={ariaLabel || text}
          onClick={onClick}
          type="button"
        >
          <div className="inner-btn-01-small">
            <p>{text}</p>
            {icon ? icon : null}
          </div>
        </button>
      ) : (
        <Link
          to={link as string}
          className="btn-01"
          aria-label={ariaLabel || text}
        >
          <div className="inner-btn-01-small">
            <p>{text}</p>
            {icon ? icon : null}
          </div>
        </Link>
      )}
    </>
  )
}

export default ButtonPrimarySmall