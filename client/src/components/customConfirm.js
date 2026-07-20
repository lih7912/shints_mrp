import Swal from "sweetalert2";

export async function customAlert(message, options = {}) {
    return await Swal.fire(`${message}`);
}

export function customConfirm(message, options = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            Swal.fire({
                title: message,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "CANCEL",
                ...options,
            })
                .then((result) => {
                    resolve(!!result.isConfirmed);
                })
                .catch(() => {
                    resolve(false); // 에러 시 안전하게 false
                });
        }, 100);
    });
}

// prompt 대체 (문자열 입력)
export function customPrompt(message, options = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            Swal.fire({
                title: String(message),
                input: "text",
                inputPlaceholder: "",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "CANCEL",
                ...options,
            })
                .then((result) => {
                    if (!result.isConfirmed) {
                        resolve(null); // 취소
                        return;
                    }
                    const value = (result.value ?? "").toString();
                    resolve(value === "" ? null : value);
                })
                .catch(() => {
                    resolve(null); // 에러 시 안전 처리
                });
        }, 100); // 이벤트 컨텍스트 분리
    });
}
