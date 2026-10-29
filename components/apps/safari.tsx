"use client";

import Image from "next/image";
import {
    ArrowLeft,
    ArrowRight,
    RotateCw,
    Share,
    Search,
} from "lucide-react";

interface SafariProps {
    isMobile?: boolean;
}

const favorites = [
    {
        title: "Instagram",
        icon: "/instagram.png",
        url: "https://www.instagram.com/cactuxbeer/",
    },
    {
        title: "GitHub",
        icon: "/github.png",
        url: "https://github.com/professordoom58-art/PingPortfolio",
    },
    {
        title: "YouTube",
        icon: "/youtube.png",
        url: "https://www.youtube.com/@Cactuxbeer",
    },
    {
        title: "Mail",
        icon: "/mail.png",
        url: "mailto:pingmihir@outlook.com",
    },
];
export default function Safari() {

    return (

        <div
            className="min-h-full flex flex-col bg-[#1C1C1E] text-[#F2F2F7]"

        >
            <div
                className="
h-12
border-b
flex
items-center
px-3
gap-3
bg-[#2C2C2E] border-[#3A3A3C]
"
            >

                <button className="w-8 h-8 rounded-full hover:bg-zinc-200 flex items-center justify-center">
                    <ArrowLeft size={17} />
                </button>

                <button className="w-8 h-8 rounded-full hover:bg-zinc-200 flex items-center justify-center">
                    <ArrowRight size={17} />
                </button>

                <button className="w-8 h-8 rounded-full hover:bg-zinc-200 flex items-center justify-center">
                    <RotateCw size={16} />
                </button>

                <div
                    className="
flex-1
h-9
bg-[#3A3A3C]
rounded-full
px-4
flex
items-center
gap-3
shadow-sm
"
                >

                    <Search
                        size={16}
                        className="text-zinc-400"
                    />

                    <span className="text-zinc-500 text-sm">
                        Search or enter website name
                    </span>

                </div>

                <button
                    className="
w-8
h-8
rounded-full
hover:bg-zinc-200
flex
items-center
justify-center
"
                >

                    <Share size={17} />

                </button>

            </div>
            <div className="flex-1 overflow-auto">

                <div className="mx-auto max-w-6xl px-16 py-16">

                    <h1 className="text-5xl font-semibold tracking-tight">
                        Favorites
                    </h1>

                    <p className="mt-3 text-zinc-500">
                        My favourite websites.
                        <div className="mt-14">
                            <div className="grid grid-cols-4 gap-10 justify-items-center">
                                {favorites.map((favorite) => (
                                    <button
                                        key={favorite.title}
                                        onClick={() => window.open(favorite.url, "_blank")}
                                        className="group flex flex-col items-center"
                                    >
                                        <div
                                            className={`
            w-20 h-20 rounded-[22px]
            flex items-center justify-center
            transition-all duration-200
            bg-zinc-800 group-hover:bg-zinc-700
          `}
                                        >
                                            <Image
                                                src={favorite.icon}
                                                alt={favorite.title}
                                                width={44}
                                                height={44}
                                            />
                                        </div>

                                        <span
                                            className="mt-3 text-sm text-zinc-300"
                                        >
                                            {favorite.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </p><div className="mt-10">

                        <div className="border-t border-zinc-700 pt-10">
                            <p className="mt-1 max-w-2xl text-zinc-400 leading-7">

                                Welcome to my portfolio.

                                Use the favourites above to explore my work,
                                repositories,
                                videos and social profiles.

                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>

    )

}