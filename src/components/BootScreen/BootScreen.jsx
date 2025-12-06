import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./boot-screen.scss";

export default function BootScreen({ show, onFinish }) {
    useEffect(() => {
        if (!show) return;
        const timer = setTimeout(() => onFinish(), 2600);
        return () => clearTimeout(timer);
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="boot-root"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="arc-core"
                        initial={{ scale: 0.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />

                    <motion.div
                        className="arc-ring"
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1.4, opacity: 1 }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                    />

                    <motion.div
                        className="boot-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                    >
                        SYSTEMS ONLINE<br />
                        MARK–47 RESUME AI LOADING...
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
