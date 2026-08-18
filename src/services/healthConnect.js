import { Capacitor, registerPlugin } from "@capacitor/core";

const HealthConnect = registerPlugin("HealthConnect");

export async function requestHealthPermissions() {
    if (!Capacitor.isNativePlatform()) {
        return {
            granted: false,
            message: "Health Connect is available only on Android."
        };
    }

    return await HealthConnect.requestHealthPermissions();
}

export async function getHealthConnectSteps() {
    if (!Capacitor.isNativePlatform()) {
        return {
            steps: 0,
            message: "Health Connect is available only on Android."
        };
    }

    return await HealthConnect.getSteps();
}