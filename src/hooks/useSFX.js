import { useCallback } from "react";

export default function useSFX() {
    const play = useCallback((path, volume = 0.5) => {
        const audio = new Audio(path);
        audio.volume = volume;
        audio.play();
    }, []);

    return { play };
}
