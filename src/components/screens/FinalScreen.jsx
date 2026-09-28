import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FinalScreen() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full relative">

            <div className="relative z-10 flex items-center justify-center h-48 w-48">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="absolute flex items-center justify-center"
                >
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                        className="bg-rose-300 blur-[50px] w-40 h-40 rounded-full"
                    ></motion.div>
                </motion.div>

                <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative flex items-center justify-center"
                >
                    <Heart
                        className="w-28 h-28 md:w-36 md:h-36 text-rose-500 fill-rose-400 drop-shadow-[0_15px_25px_rgba(244,114,182,0.4)]"
                        strokeWidth={1.5}
                    />

                </motion.div>
            </div>

            <div className="text-center z-10">
                <motion.h1
                    className="text-5xl md:text-6xl font-semibold text-slate-700 mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    I Love You.
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-3xl text-rose-500 font-hand"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    I can't wait to see you again.
                </motion.p>
            </div>
        </div>
    );
}