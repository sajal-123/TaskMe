import clsx from "clsx";
import React, { FC, ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode; // Accepts a ReactNode for the icon
  className?: string; // Optional string for custom class names
  label: string; // The button label, required
  type?: "button" | "submit" | "reset"; // Specifies the button type
  onClick?: () => void; // Optional click handler
}

const Button: FC<ButtonProps> = ({
  icon,
  className,
  label,
  type = "button",
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={clsx("px-3 py-2 outline-none hover:scale-105 duration-300 hover:text-blue-600 hover:bg-transparent hover:font-bold hover:border hover:border-blue-600", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
