```jsx
"use client";

import { motion } from "framer-motion";
import { Camera, Heart, Sparkles, Utensils, Film, Star } from "lucide-react";
import Button from "../Button";

const thingsToDo = [
    {
        title: "A Long Hug",
        desc: "Just holding each other and forgetting the world.",
        icon: Heart,
    },
    {
        title: "Food Date",
        desc: "Eating our favorite food and talking for hours.",
        icon: Utensils,
    },
    {
        title: "Movie Date",
        desc: "A cozy movie, snacks, and lots of laughs.",
        icon: Film,
    },
    {
        title: "Make New Memories",
        desc: "Creating little moments we'll remember forever.",
        icon: Star,
    },
];

function ThingsToDoScreen({ onNext }) {
    return (
        <div className="flex flex-col items-center h-full w-full relative overflow-hidden px-4">

            {/* Floating decorations */}
            <motion.div
                className="absolute top-20 left-5 text-rose-300/50"
                animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <Heart size={22} fill="currentColor" />
            </motion.div>

            <motion.div
                className="absolute top-32 right-7 text-pink-300/50"
                animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
            >
                <Sparkles size={22} />
            </motion.div>

            {/* Heading */}
            <motion.div
                className="text-center z-10 mt-6 md:mt-8 mb-7 shrink-0"
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="h-px w-8 bg-rose-300" />
                    <span className="text-rose-400 text-xs font-bold uppercase tracking-[0.25em]">
                        Our Little Plans
                    </span>
                    <span className="h-px w-8 bg-rose-300" />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
                    Things we'll do
                </h2>

                <p className="text-xl md:text-2xl font-hand text-rose-500 mt-1">
                    when we finally meet again ♡
                </p>
            </motion.div>

            {/* Cards */}
            <div className="w-full max-w-3xl mb-8 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                    {thingsToDo.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 35,
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.12,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                whileHover={{
                                    y: -5,
                                    scale: 1.02,
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="relative h-32 md:h-36 rounded-3xl bg-white/75 backdrop-blur-md border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">

                                    {/* Soft decoration */}
                                    <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-rose-100/70" />

                                    <div className="relative h-full flex items-center p-4 md:p-5">

                                        {/* Icon */}
                                        <div className="shrink-0 w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-rose-50 flex items-center justify-center shadow-inner">
                                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                <Icon
                                                    size={25}
                                                    className="text-rose-400"
                                                    fill={
                                                        item.icon === Heart
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* Text */}
                                        <div className="ml-4 flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-rose-400">
                                                    0{index + 1}
                                                </span>

                                                <span className="h-1 w-1 rounded-full bg-rose-300" />
                                            </div>

                                            <h4 className="text-lg md:text-xl font-bold text-slate-700 mt-0.5 leading-tight">
                                                {item.title}
                                            </h4>

                                            <p className="text-sm md:text-base font-hand text-slate-500 mt-1 leading-snug">
                                                {item.desc}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                </div>
            </div>

            {/* Bottom button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.9,
                    duration: 0.5,
                }}
                className="z-20 pb-4"
            >
                <Button
                    onClick={onNext}
                    animateIcon={false}
                    text="See Our Memories"
                    icon={<Camera size={18} />}
                />
            </motion.div>

        </div>
    );
}

export default ThingsToDoScreen;
