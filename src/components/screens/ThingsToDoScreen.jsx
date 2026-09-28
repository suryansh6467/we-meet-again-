
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
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
    const [revealedCards, setRevealedCards] = useState(() => new Set());

    const toggleCard = (index) => {
        setRevealedCards((current) => {
            const next = new Set(current);

            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }

            return next;
        });
    };

    return (
        <div className="flex flex-col items-center h-full w-full relative">
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

            <div className="w-full max-w-4xl mb-10 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pt-2">
                    {thingsToDo.map((item, index) => {
                        const isRevealed = revealedCards.has(index);

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15
                                }}
                            >
                                <motion.button
                                    type="button"
                                    onClick={() => toggleCard(index)}
                                    aria-expanded={isRevealed}
                                    aria-label={`${isRevealed ? "Hide" : "Reveal"} ${item.title}`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative flex h-28 md:h-32 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] overflow-hidden border border-slate-200 w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                                >
                                    <div className="w-24 md:w-28 bg-rose-100 flex flex-col items-center justify-center border-r border-slate-200 shrink-0">
                                        <motion.div
                                            animate={{
                                                scale: isRevealed ? [1, 1.2, 1] : 1,
                                                rotate: isRevealed ? [0, -10, 10, 0] : 0
                                            }}
                                            transition={{ duration: 0.45 }}
                                            className="bg-white p-2.5 rounded-full shadow-sm mb-1.5"
                                        >
                                            <Heart
                                                size={28}
                                                className="text-rose-400"
                                                fill={isRevealed ? "currentColor" : "none"}
                                            />
                                        </motion.div>

                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            #{index + 1}
                                        </span>
                                    </div>

                                    <div className="flex-1 p-4 pl-5 md:pl-6 flex flex-col justify-center bg-white relative overflow-hidden">
                                        <AnimatePresence mode="wait" initial={false}>
                                            {isRevealed ? (
                                                <motion.div
                                                    key="revealed"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -6 }}
                                                    transition={{ duration: 0.22 }}
                                                >
                                                    <h3 className="text-lg md:text-xl font-bold text-slate-700 leading-tight">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-sm md:text-base font-hand text-slate-500 mt-1 leading-snug">
                                                        {item.desc}
                                                    </p>
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="hidden"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-base md:text-lg font-semibold text-rose-400"
                                                >
                                                    Tap to reveal ♡
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <Button
                    onClick={onNext}
                    animateIcon={false}
                    text="I Have Some Pics of your"
                    icon={<Camera size={18} />}
                />
            </motion.div>
        </div>
    );
}

export default ThingsToDoScreen;
```
