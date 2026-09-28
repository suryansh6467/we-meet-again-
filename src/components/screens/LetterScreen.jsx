"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, RotateCcw, Sparkles } from "lucide-react";
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

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
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
            "Camera permission is blocked. Please allow camera access and try again."
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

  const takeSelfie = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    // Mirror the selfie like a normal front camera
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image = canvas.toDataURL("image/jpeg", 0.92);

    setPhoto(image);

    // Stop camera after taking selfie
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const retakeSelfie = async () => {
    setPhoto(null);
    setCameraError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
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
      console.error(error);
      setCameraError("Unable to reopen the camera.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mt-2 md:mt-4 shrink-0"
      >
        <span className="text-rose-400 font-bold tracking-widest uppercase text-xs mb-1 block opacity-90">
          A Little Surprise
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-slate-700 mb-1">
          Capture This Moment
        </h2>
      </motion.div>

      {/* Camera Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 120,
        }}
        className="relative w-full max-w-md my-8 z-10"
      >
        <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.18)] border-4 border-white">

          {/* Captured Photo */}
          {photo ? (
            <img
              src={photo}
              alt="Captured selfie"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              {/* Camera Preview */}
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

              {/* Camera Overlay */}
              <div className="absolute inset-0 pointer-events-none">

                {/* Top text */}
                <div className="absolute top-5 left-0 right-0 text-center">
                  <span className="inline-block bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                    Take a cute selfie 📸
                  </span>
                </div>

                {/* Face guide */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-64 md:w-60 md:h-72 border-2 border-white/70 rounded-[45%] border-dashed" />
                </div>

              </div>
            </>
          )}

          {/* Camera Error */}
          {cameraError && !photo && (
            <div className="absolute inset-0 bg-[#fffaf5] flex flex-col items-center justify-center text-center p-6">
              <Camera size={45} className="text-rose-400 mb-4" />

              <p className="text-slate-600 text-sm leading-relaxed">
                {cameraError}
              </p>

              <button
                onClick={retakeSelfie}
                className="mt-5 px-5 py-2.5 rounded-full bg-rose-400 text-white font-semibold"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col items-center gap-3 z-20"
      >

        {!photo ? (
          <button
            onClick={takeSelfie}
            disabled={!!cameraError}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-rose-400 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold shadow-lg transition-all active:scale-95"
          >
            <Camera size={19} />
            Take Selfie
          </button>
        ) : (
          <>
            <button
              onClick={retakeSelfie}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-600 font-semibold shadow-md border border-black/5 transition-all active:scale-95"
            >
              <RotateCcw size={18} />
              Retake Selfie
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