import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ReactNode,
} from 'react';

type Props = {
  readonly label: string;
  readonly children?: ReactNode;
  readonly customClass?: string;
  readonly buttonProps?: string;
};

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  label,
  children,
  customClass,
  buttonProps,
}: Props & ButtonProps) {
  return (
    <button
      className={
        'flex items-center justify-center focus:outline-none disabled:opacity-40 disabled:cursor-default font-bold ' +
        customClass
    } {...buttonProps}>
        {children ? children : label}
    </button>
);
}
