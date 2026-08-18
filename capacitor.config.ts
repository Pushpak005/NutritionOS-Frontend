import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.nutritionos.app",
    appName: "NutritionOS",
    webDir: "dist",

    server: {
        url: "http://100.99.85.65:5173",
        cleartext: true
    }
};

export default config;