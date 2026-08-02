import { toast } from "react-hot-toast";

export function showSuccess(message) {

    toast.success(message, {

        duration: 3000,

        position: "top-right"

    });

}

export function showError(message) {

    toast.error(message, {

        duration: 3000,

        position: "top-right"

    });

}

export function showInfo(message) {

    toast(message, {

        icon: "🤖",

        duration: 3000,

        position: "top-right"

    });

}