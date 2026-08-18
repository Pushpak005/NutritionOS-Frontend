export function getDishImage(imageKey) {

    if (!imageKey) {
        return "";
    }

    return `${import.meta.env.VITE_SUPABASE_STORAGE}/${imageKey}.png?v=2`;
}