import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react"

interface Props {
    label: string
    children?: ReactNode
    customClass?: string
}

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function Button({
    label,
    children,
    customClass,
    ...buttonProps
}: Props & ButtonProps) {
    return (
        <button className={'flex items-center justify-center focus:outline-none disabled:opacity-40 disabled:cursor-default font-bold ' +
            customClass
        } {...buttonProps}>
            {children ? children : label}
        </button>
    );
}
