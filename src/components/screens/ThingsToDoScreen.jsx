import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import Button from "../Button";

const thingsToDo = [
    { title: "Hug for 30 mins", desc: "Just holding you tight" },
    { title: "Food Date", desc: "Eating all our favorites" },
    { title: "Movie Date", desc: "Watching something together" },
    { title: "Make New Memories", desc: "Creating moments we'll never forget" }
]

function ThingsToDoScreen({ onNext }) {
    return (
        <div className="flex flex-col items-center h-full w-full relative">

            <motion.div className="text-center z-10 mt-6 md:mt-8 mb-6 shrink-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-5xl font-bold text-slate-700 mb-2">
                    Things we'll do
                </h2>
                <p className="text-xl md:text-2xl font-hand text-rose-500">when we finally meet again</p>
            </motion.div>

            <div className="w-full max-w-4xl mb-10 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pt-2">
                    {thingsToDo.map((item, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative flex h-28 md:h-32 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.04)] overflow-hidden group border border-slate-200 w-full"
                                >

                                    <div className={`w-24 md:w-28 bg-rose-100 flex flex-col items-center justify-center border-r border-slate-200 transition-colors shrink-0`}>
                                        <div className="bg-white p-2.5 rounded-full shadow-sm mb-1.5">
                                            <Heart size={28} className="text-rose-400" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            #{index + 1}
                                        </span>
                                    </div>

                                    <div className="flex-1 p-4 pl-5 md:pl-6 flex flex-col justify-center bg-white relative overflow-hidden">
                                        <h4 className="text-lg md:text-xl font-bold text-slate-700 leading-tight pr-8">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm md:text-base font-hand text-slate-500 mt-1 leading-snug pr-8">
                                            {item.desc}
                                        </p>

                                    </div>
                                </motion.div>
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
                <Button onClick={onNext} animateIcon={false} text="See Our Memories" icon={<Camera size={18} />} />
            </motion.div>
        </div>
    );
};

export default ThingsToDoScreen