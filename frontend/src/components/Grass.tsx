import {ReactNode} from "react";

type Props = {
    children: ReactNode
    className?: string
}

export function Grass({children, className}: Props) {
    return (
        <div className={'bg-gray-200/30 backdrop-blur-lg rounded-md border border-gray-200/30 shadow-lg' + className}>
            {children}
        </div>
    );
}
