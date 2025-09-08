import type {ButtonHTMLAttributes, ReactNode} from "react";
import './button.scss'

export type ButtonVariant = 'filled' | 'outline' | 'flattened' | 'icon' | 'filledIcon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  children?: ReactNode;
  icon?: ReactNode;
};

export const Button = (props: ButtonProps) => {
  const {
    variant = 'filled',
    children,
    icon,
    disabled = false,
    ...rest
  } = props;

  return (
    <button className={variant} disabled={disabled} {...rest}>
      {!!icon && <div className="innerIcon">{icon}</div>}
        {children}
    </button>
  );
};
