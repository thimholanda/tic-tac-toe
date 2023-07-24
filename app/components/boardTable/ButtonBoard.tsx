import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./styles.module.sass";

type ButtonProps = {
  isActive: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonBoard = ({ children, isActive = false, ...rest }: PropsWithChildren<ButtonProps>) => {
  return (
    <button {...rest} type="button" className={`${styles.boardButton} ${!!isActive && styles.active}`}>
      <span>{children}</span>
    </button>
  );
};

export default ButtonBoard;
