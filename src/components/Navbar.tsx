import { ReactElement } from 'react';
import { Logo } from '../icons/logo';

interface Props {
    icon: ReactElement;
    title: string;
}

export default function Navbar({ title }: Props) {
    return (
        <header className="bg-zinc-800 shadow-md py-5">
            <div className="container mx-auto flex items-center justify-center gap-2">
                <a href="/" className="flex items-center space-x-2">
                    <div className="h-10 w-10 flex-shrink-0">
                        <Logo />
                    </div>

                    <h1 className="text-4xl  text-zinc-50">{title}</h1>
                </a>
            </div>
        </header>
    );
}
