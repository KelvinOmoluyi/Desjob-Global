import React from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  type?: "link" | "button"
  text: string
  link?: string
  icon?: React.ReactNode
}

const ButtonPrimary = ({type = "link", text, link, icon}: ButtonProps) => {
  return (
    <>
      {type === "button" ? (
        <div
          className="btn-01"
        >
          <div className="inner-btn-01">
            <p>{text}</p>
            {icon ? icon : null}
          </div>
        </div>
      ) : (
        <Link
          to={link as string}
          className="btn-01"
        >
          <div className="inner-btn-01">
            <p>{text}</p>
            {icon ? icon : null}
          </div>
        </Link>
      )}
    </>
  )
}

export default ButtonPrimary