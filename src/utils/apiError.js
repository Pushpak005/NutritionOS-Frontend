import { showError } from "../components/common/AppToast";

export function handleApiError(error) {

    console.error(error);

    if (error.response?.data?.detail) {

        showError(error.response.data.detail);

        return;

    }

    if (error.message) {

        showError(error.message);

        return;

    }

    showError("Something went wrong.");

}