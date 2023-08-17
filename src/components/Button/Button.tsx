import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: string;
  color?: "primary" | "seconday" | "success" | "danger" | "warning" | "info";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <button
      typeof="button"
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
