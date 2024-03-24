import {ReactNode} from "react";

type Props = {
    children: ReactNode
}

export function Header({children}: Props) {
    return (
        <div>
            <header className="bg-sky-600">
                <nav className="items-center w-full p-4 lg:px-4">
                    <div className="hidden lg:flex lg:justify-end">
                        <p className="mr-auto text-3xl text-white font-anton">poke</p>
                        {children}
                    </div>
                </nav>
            </header>
        </div>
    );
}
