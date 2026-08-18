export function getDishImage(imageKey) {
    if (!imageKey) {
        return "";
    }

    const storageBase =
        import.meta.env.VITE_SUPABASE_STORAGE;

    if (!storageBase) {
        console.error(
            "VITE_SUPABASE_STORAGE is not configured."
        );

        return "";
    }

    return `${storageBase.replace(/\/$/, "")}/${imageKey}.png`;
}