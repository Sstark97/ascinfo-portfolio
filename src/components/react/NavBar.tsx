import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
    path: string;
}

const NavList: React.FC<Props> = ({ path }) => (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
        >
            <a href="/" className={`flex items-center hover:text-blue-500 transition-colors ${path === "/" ? "text-primary" : ""}`}>
                Home
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
        >
            <a href="/blog" className={`flex items-center hover:text-blue-500 transition-colors ${path === "/blog" ? "text-primary" : ""}`}>
                Blog
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
        >
            <a href="/proyectos" className={`flex items-center hover:text-blue-500 transition-colors ${path === "/proyectos" ? "text-primary" : ""}`}>
                Proyectos
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
        >
            <a href="/contacto" className={`flex items-center hover:text-blue-500 transition-colors ${path === "/contacto" ? "text-primary" : ""}`}>
                Contacto
            </a>
        </Typography>
    </ul>
);

export const NavBar: React.FC<Props> = ({ path }) => {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="border-t-transparent border-x-transparent border-b-[0.75px] border-b-primary rounded-b-none bg-black mx-auto max-w-screen-xl px-6 py-3">
            <div className="flex items-center justify-between text-white">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="text-primary mr-4 cursor-pointer py-1.5"
                >
                    Aitor Santana
                </Typography>
                <div className="hidden lg:block">
                    <NavList path={path} />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList path={path} />
            </Collapse>
        </Navbar>
    );
};