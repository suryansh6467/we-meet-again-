import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Button from "../Button";

const lastMetDate = "2025-01-01";

function LastMetScreen({ onNext }) {
    const [days, setDays] = useState(0);
    const [dateStr, setDateStr] = useState("");

    useEffect(() => {
        const lastMet = new Date(lastMetDate);
        const today = new Date();
        lastMet.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(today - lastMet);
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        setDays(diffDays);
        setDateStr(lastMet.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center relative">
            <motion.p
                className="text-lg md:text-xl text-slate-6600 font-medium uppercase tracking-wider mb-2 z-10 will-change-transform"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                We last met on
            </motion.p>

            <motion.h3
                className="text-2xl md:text-3xl font-hand font-semibold text-pink-500 mb-8 z-10 will-change-transform"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                {dateStr}
            </motion.h3>

            <motion.div
                className="relative z-10 bg-white/70 backdrop-blur-md p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(251,113,133,0.15)] border-2 border-white/80 flex flex-col items-center w-full max-w-sm will-change-transform"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", damping: 20 }}
            >
                <div className="flex flex-col items-center mb-4 relative">
                    <span className="text-7xl md:text-8xl font-semibold bg-clip-text text-transparent bg-linear-to-br from-slate-700 to-rose-400">
                        {days}
                    </span>
                    <span className="text-xl font-medium text-pink-400 mt-2">
                        Days Ago
                    </span>
                </div>

                <div className="w-16 h-1 rounded-full bg-pink-100 my-4 relative"></div>

                <p className="text-2xl md:text-[26px] text-slate-600 font-hand font-semibold leading-snug text-balance relative">
                    And I've missed you every single one of them.
                </p>
            </motion.div>

            <motion.div className="mt-12 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                <Button onClick={onNext} />
            </motion.div>
        </div>
    );
}

export default LastMetScreen