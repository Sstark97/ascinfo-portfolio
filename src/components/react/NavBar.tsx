import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

interface Props {
    path: string;
}

const NavList: React.FC<Props> = ({ path }) => (
    <ul className="my-2 flex flex-col gap-2 lg:w-full lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="paragraph"
            color="white"
            className="p-1 font-medium"
        >
            <a href="/" className={`flex items-center hover:text-blue-500 transition-colors ${path === "/" ? "text-primary" : ""}`}>
                Sobre mí
            </a>
        </Typography>
        <Typography
            as="li"
            variant="paragraph"
            color="white"
            className="p-1 font-medium"
        >
            <a href="/blog" className={`flex items-center hover:text-blue-500 transition-colors ${path === "/blog" ? "text-primary" : ""}`}>
                Blog
            </a>
        </Typography>
        <Typography
            as="li"
            variant="paragraph"
            color="white"
            className="p-1 font-medium"
        >
            <a href="/proyectos" className={`flex items-center hover:text-blue-500 transition-colors ${path === "/proyectos" ? "text-primary" : ""}`}>
                Proyectos
            </a>
        </Typography>
        <Typography
            as="li"
            variant="paragraph"
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
        <Navbar className="border-t-transparent border-x-transparent border-b-[0.75px] border-b-primary rounded-b-none bg-black mx-auto px-6 py-3 fixed z-10 lg:max-w-none lg:px-8 lg:py-5">
            <div className="flex items-center justify-between text-white">
                <Typography
                    as="a"
                    href="#"
                    variant="h5"
                    className="flex text-primary mr-4 cursor-pointer py-1.5"
                >
                    Aitor Santana
                    <RocketLaunchIcon className="h-6 w-6 ml-4" strokeWidth={2} />
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