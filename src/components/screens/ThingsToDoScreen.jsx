"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera,
    Heart,
    Sparkles,
    Utensils,
    Film,
    Star,
    LockKeyhole,
} from "lucide-react";
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
    const [revealed, setRevealed] = useState([]);

    const revealCard = (index) => {
        setRevealed((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index]
        );
    };

    return (
        <div className="flex flex-col items-center h-full w-full relative overflow-hidden px-4">

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

            <motion.div
                className="text-center z-10 mt-6 md:mt-8 mb-7 shrink-0"
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="h-px w-8 bg-rose-300" />

                    <span className="text-rose-400 text-xs font-bold uppercase tracking-[0.25em]">
                        A Little Surprise
                    </span>

                    <span className="h-px w-8 bg-rose-300" />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
                    Things we'll do
                </h2>

                <p className="text-xl md:text-2xl font-hand text-rose-500 mt-1">
                    tap to reveal ♡
                </p>
            </motion.div>

            <div className="w-full max-w-3xl mb-8 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                    {thingsToDo.map((item, index) => {
                        const Icon = item.icon;
                        const isRevealed = revealed.includes(index);

                        return (
                            <motion.button
                                type="button"
                                key={index}
                                onClick={() => revealCard(index)}
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
                                }}
                                whileTap={{ scale: 0.97 }}
                                className="relative h-32 md:h-36 w-full text-left rounded-3xl overflow-hidden focus:outline-none"
                            >
                                <AnimatePresence mode="wait">
                                    {!isRevealed ? (
                                        <motion.div
                                            key="hidden"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute inset-0 bg-gradient-to-br from-rose-300 via-pink-300 to-rose-400 flex flex-col items-center justify-center text-white shadow-[0_10px_30px_rgba(244,114,182,0.18)]"
                                        >
                                            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                                            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-white/10" />

                                            <motion.div
                                                animate={{ scale: [1, 1.08, 1] }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                }}
                                                className="relative"
                                            >
                                                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                                    <LockKeyhole size={23} />
                                                </div>
                                            </motion.div>

                                            <span className="relative mt-2 text-xs font-bold uppercase tracking-[0.2em]">
                                                Tap to reveal
                                            </span>

                                            <span className="relative text-[10px] text-white/75 mt-0.5">
                                                #{index + 1}
                                            </span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="revealed"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.9,
                                                rotateY: 90,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotateY: 0,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                type: "spring",
                                                stiffness: 120,
                                            }}
                                            className="absolute inset-0 bg-white/85 backdrop-blur-md border border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                                        >
                                            <div className="h-full flex items-center p-4 md:p-5">

                                                <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-rose-50 flex items-center justify-center">
                                                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                                        <Icon
                                                            size={24}
                                                            className="text-rose-400"
                                                            fill={
                                                                item.icon === Heart
                                                                    ? "currentColor"
                                                                    : "none"
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="ml-4 min-w-0">
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-rose-400">
                                                        0{index + 1}
                                                    </span>

                                                    <h4 className="text-lg md:text-xl font-bold text-slate-700 leading-tight">
                                                        {item.title}
                                                    </h4>

                                                    <p className="text-sm md:text-base font-hand text-slate-500 mt-1 leading-snug">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            <Heart
                                                size={15}
                                                className="absolute top-4 right-4 text-rose-300"
                                                fill="currentColor"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}

                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
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
