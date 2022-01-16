import React from "react";
import { classNames } from "../../utilities/css";
import "./Button.scss";

export function Button({
  children,
  fullWidth,
  success,
  primary,
  destructive,
  info,
  size,
  onClick,
  submit,
}) {
  const type = submit ? "submit" : "button";

  const className = classNames(
    "button",
    primary && "button--primary",
    success && "button--success",
    destructive && "button--destructive",
    info && "button--info",
    fullWidth && "button--fullWidth",
    size === "slim" && "button--sizeSlim"
  );

  return (
    <button
      onClick={() => onClick && onClick()}
      type={type}
      className={className}
    >
      {children}
    </button>
  );
}
