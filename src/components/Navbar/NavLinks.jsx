import Link from "next/link";
import { useState } from "react";
import { links } from "./MyLinks";
const NavLinks = () => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");

    return (
        <>
            {links.map((link, idx) => (
                <div key={idx}>
                    <div className="px-3 text-left md:cursor-pointer group">
                        <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5 group" onClick={() => { heading !== link.name ? setHeading(link.name) : setHeading(""); setSubHeading("") }}>
                            {link.name}
                            <span className="text-xl md:hidden inline">
                                <ion-icon name={`${heading === link.name ? "chevron-up" : "chevron-down"}`}></ion-icon>
                            </span>
                            <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                                <ion-icon name={`${"chevron-down"}`}></ion-icon>
                            </span>
                        </h1>
                        {link.submenu && (
                            <div>
                                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                    <div className="py-3">
                                        <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45  border-l border-t border-black"></div>
                                    </div>
                                    <div className={`border border-black bg-white p-5 grid grid-cols-${Math.ceil(link.sublinks.length/2)+link.sublinks.length%2} gap-6`}>
                                        {
                                            link.sublinks.map((sublinks, idx) => (
                                                <div key={idx}>
                                                    <h1 className="text-lg font-semibold">
                                                        {sublinks.Head}
                                                    </h1>
                                                    {sublinks.sublink.map(
                                                        (sublink, idx) => (
                                                            <li key={idx} className="text-sm text-gray-600 my-2.5">
                                                                <Link href={sublink.link}>
                                                                    <a className="hover:text-[#4A3AFF]" >{sublink.name}</a>
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Menu em dispositivos móveis */}
                    <div className={`
                    ${heading === link.name ? "md:hidden" : "hidden"}
                    `}>
                        {
                            link.sublinks.map((sublinks, idx) => (
                                <div key={idx}>
                                    <div>
                                        <h1 className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center"
                                            onClick={() => subHeading !== sublinks.Head ? setSubHeading(sublinks.Head) : setSubHeading("")}>
                                            {sublinks.Head}
                                            <span className="text-xl md:mt-1 md:ml-2 inline">
                                                <ion-icon name={`${subHeading === sublinks.Head ? "chevron-up" : "chevron-down"}`}></ion-icon>
                                            </span>
                                        </h1>
                                        <div className={`${subHeading === sublinks.Head ? 'md:hidden' : 'hidden'}`}>
                                            {sublinks.sublink.map((sublink, idx) => (
                                                <li key={idx} className="py-3 pl-14">
                                                    <Link href={sublink.link}>
                                                        <a className="hover:text-[#4300ff]" >{sublink.name}</a>
                                                    </Link>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </>
    );
}

export default NavLinks;