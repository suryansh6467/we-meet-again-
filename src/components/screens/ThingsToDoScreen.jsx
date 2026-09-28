"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Lock } from "lucide-react";
import Button from "../Button";

const thingsToDo = [
    {
        title: "Hug for 30 mins",
        desc: "Just holding you tight"
    },
    {
        title: "Food Date",
        desc: "Eating all our favorites"
    },
    {
        title: "Movie Date",
        desc: "Watching something together"
    },
    {
        title: "Make New Memories",
        desc: "Creating moments we'll never forget"
    }
];

function ThingsToDoScreen({ onNext }) {
    const [revealed, setRevealed] = useState({});

    const toggleReveal = (index) => {
        setRevealed((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="flex flex-col items-center h-full w-full relative px-4">

            {/* Heading */}
            <motion.div
                className="text-center z-10 mt-6 md:mt-8 mb-6 shrink-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-slate-700 mb-2">
                    Things I'll do
                </h2>

                <p className="text-xl md:text-2xl font-hand text-rose-500">
                    when I meet you next time ♡
                </p>
            </motion.div>

            {/* Cards */}
            <div className="w-full max-w-4xl mb-8 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

                    {thingsToDo.map((item, index) => {
                        const isRevealed = revealed[index];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12
                                }}
                            >
                                <motion.button
                                    type="button"
                                    onClick={() => toggleReveal(index)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative w-full h-32 md:h-36 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-[0_8px_20px_rgba(0,0,0,0.05)] text-left focus:outline-none focus:ring-2 focus:ring-rose-300"
                                >

                                    {/* Number / Icon */}
                                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-28 bg-rose-100 flex flex-col items-center justify-center border-r border-slate-200">
                                        <div className="bg-white p-2.5 rounded-full shadow-sm mb-1.5">
                                            <Heart
                                                size={27}
                                                className="text-rose-400"
                                                fill="currentColor"
                                            />
                                        </div>

                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            #{index + 1}
                                        </span>
                                    </div>

                                    {/* Reveal Content */}
                                    <div className="absolute left-24 md:left-28 right-0 top-0 bottom-0">

                                        <AnimatePresence mode="wait">

                                            {!isRevealed ? (
                                                <motion.div
                                                    key="hidden"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mb-2">
                                                        <Lock
                                                            size={17}
                                                            className="text-rose-400"
                                                        />
                                                    </div>

                                                    <span className="text-sm font-semibold text-slate-500">
                                                        Tap to reveal
                                                    </span>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="show"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.95
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.95
                                                    }}
                                                    transition={{
                                                        duration: 0.25
                                                    }}
                                                    className="absolute inset-0 flex flex-col justify-center px-5 md:px-7 bg-white"
                                                >
                                                    <h4 className="text-lg md:text-xl font-bold text-slate-700">
                                                        {item.title}
                                                    </h4>

                                                    <p className="text-sm md:text-base font-hand text-slate-500 mt-1">
                                                        {item.desc}
                                                    </p>

                                                    <span className="absolute right-4 top-3 text-rose-300">
                                                        ♡
                                                    </span>
                                                </motion.div>
                                            )}

                                        </AnimatePresence>

                                    </div>

                                </motion.button>
                            </motion.div>
                        );
                    })}

                </div>
            </div>

            {/* Next Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="pb-4"
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
