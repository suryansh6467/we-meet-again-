"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  RotateCcw,
  Sparkles,
  Heart,
} from "lucide-react";
import Button from "../Button";

export default function LetterScreen({ onNext }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraError, setCameraError] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        setCameraError("");

        if (!navigator.mediaDevices?.getUserMedia) {
          setCameraError("Camera is not supported in this browser.");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Camera error:", error);

        if (error.name === "NotAllowedError") {
          setCameraError(
            "Camera permission denied. Please allow camera access."
          );
        } else if (error.name === "NotFoundError") {
          setCameraError("No camera was found on this device.");
        } else {
          setCameraError("Unable to open the camera.");
        }
      }
    };

    startCamera();

    return () => {
      mounted = false;

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const takeSelfie = () => {
    const video = videoRef.current;

    if (!video || !video.videoWidth || !video.videoHeight) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.save();
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.restore();

    const image = canvas.toDataURL("image/jpeg", 0.92);

    setPhoto(image);
    stopCamera();
  };

  const retakeSelfie = async () => {
    setPhoto(null);
    setCameraError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error("Retake camera error:", error);
      setCameraError("Unable to reopen the camera.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden px-4">

      {/* Background decorations */}
      <motion.div
        className="absolute top-16 left-5 text-rose-300/40"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Heart size={22} fill="currentColor" />
      </motion.div>

      <motion.div
        className="absolute top-24 right-6 text-pink-300/40"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
      >
        <Sparkles size={22} />
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center mt-2 mb-5"
      >
        <span className="block text-rose-400 font-bold tracking-[0.25em] uppercase text-[10px] mb-1">
          A Little Surprise
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
          Its You Cutiee
        </h2>

        <p className="text-lg md:text-xl font-hand text-rose-500 mt-1">
          one little memory to keep ♡
        </p>
      </motion.div>

      {/* Camera */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 120,
        }}
        className="relative z-10 w-full max-w-[380px]"
      >
        <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden bg-black border-[5px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.12)]">

          {/* Camera / Photo */}
          <AnimatePresence mode="wait">
            {photo ? (
              <motion.img
                key="photo"
                src={photo}
                alt="Captured selfie"
                initial={{
                  opacity: 0,
                  scale: 1.05,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: "scaleX(-1)",
                  }}
                />

                {/* Camera gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

                {/* Top label */}
                <div className="absolute top-4 left-0 right-0 flex justify-center">
                  <span className="px-4 py-2 rounded-full bg-black/35 backdrop-blur-md text-white text-xs font-medium">
                    Smile ♡
                  </span>
                </div>

                {/* Face guide */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[58%] h-[68%] rounded-[48%] border-2 border-white/60 border-dashed" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Camera Error */}
          {cameraError && !photo && (
            <div className="absolute inset-0 bg-[#fffaf5] flex flex-col items-center justify-center text-center px-7">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <Camera
                  size={28}
                  className="text-rose-400"
                />
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {cameraError}
              </p>

              <button
                onClick={retakeSelfie}
                className="mt-5 px-6 py-2.5 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-semibold shadow-md transition-all active:scale-95"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Captured badge */}
          {photo && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="absolute top-4 left-1/2 -translate-x-1/2"
            >
              <span className="px-4 py-2 rounded-full bg-white/85 backdrop-blur-md text-slate-600 text-xs font-semibold shadow-sm">
                Perfect ♡
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}
        className="relative z-20 flex flex-col items-center gap-3 mt-5"
      >
        {!photo ? (
          <button
            onClick={takeSelfie}
            disabled={!!cameraError}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-rose-400 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold shadow-[0_8px_20px_rgba(244,114,182,0.25)] transition-all active:scale-95"
          >
            <Camera size={19} />
            Take Selfie
          </button>
        ) : (
          <>
            <button
              onClick={retakeSelfie}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-600 font-semibold shadow-md border border-slate-100 transition-all active:scale-95"
            >
              <RotateCcw size={17} />
              Retake
            </button>

            <Button
              onClick={onNext}
              text="One Last Thing"
              icon={<Sparkles size={18} />}
              animateIcon={false}
            />
          </>
        )}
      </motion.div>

    </div>
  );
}
