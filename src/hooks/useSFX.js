// src/hooks/useSFX.js
export default function useSFX() {
    const play = (src, volume = 1) => {
        const audio = new Audio(src);
        audio.volume = volume;
        audio.play().catch(() => { });
    };

    return { play };
}
