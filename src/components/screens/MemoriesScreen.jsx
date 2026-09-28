import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';

const memories = [
    "/images/1.avif",
    "/images/2.avif",
    "/images/3.avif",
    // "/images/4.avif",
];

function MemoriesScreen({ onNext }) {
    const [cards, setCards] = useState(memories);

    const swipeCard = () => {
        if (cards.length > 1) {
            setCards(prev => prev.slice(1));
        }
    };

    const isLastCard = cards.length === 1;

    return (
        <div className="flex flex-col justify-center items-center w-full h-full relative">

            <motion.div
                className="text-center z-10 mt-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-slate-700 mb-2">
                    See Yourself
                </h2>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={isLastCard ? 'last' : 'more'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl md:text-2xl font-hand text-purple-400"
                    >
                        ♡Kitni sundar ho tum ohh Sorry Sorry aap Malkin jii♡
                    </motion.p>
                </AnimatePresence>
            </motion.div>

            {/* Photos */}
            <div className="relative w-full max-w-[400px] h-[410px] md:h-[450px] my-4 flex items-center justify-center">

                <AnimatePresence>
                    {cards.map((photo, index) => {

                        if (index > 2) return null;

                        const isTop = index === 0;

                        return (
                            <motion.div
                                key={photo}
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 50
                                }}
                                animate={{
                                    opacity: 1 - (index * 0.15),
                                    scale: 1 - (index * 0.05),
                                    y: index * 15,
                                    rotate: isTop
                                        ? 0
                                        : (index % 2 === 0 ? 3 : -3),
                                    zIndex: cards.length - index
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -100,
                                    transition: {
                                        duration: 0.4,
                                        ease: "easeOut"
                                    }
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 18
                                }}
                                className={`absolute left-1/2 -translate-x-1/2 top-8
                                    w-[270px] h-[320px]
                                    md:w-[300px] md:h-[350px]
                                    bg-[#fafafa] p-4 pb-16
                                    rounded-xl
                                    shadow-[0_15px_35px_rgba(0,0,0,0.08)]
                                    border border-pink-50
                                    ${isTop && !isLastCard ? 'cursor-pointer' : ''}`
                                }
                                onClick={
                                    isTop && !isLastCard
                                        ? swipeCard
                                        : undefined
                                }
                                whileTap={{ scale: 0.98 }}
                            >

                                {/* Auto-fit image area */}
                                <div className="w-full h-full rounded-sm overflow-hidden shadow-inner border border-slate-100 bg-slate-100 flex items-center justify-center">

                                    <img
                                        src={photo}
                                        alt="Memory"
                                        className="w-full h-full object-contain"
                                        draggable="false"
                                    />

                                </div>

                            </motion.div>
                        );
                    })}
                </AnimatePresence>

            </div>

            <motion.div
                className="shrink-0 z-10 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <Button
                    onClick={onNext}
                    text="♡Now Open My Heart♡"
                    animateIcon={false}
                />
            </motion.div>

        </div>
    );
}

export default MemoriesScreen;
