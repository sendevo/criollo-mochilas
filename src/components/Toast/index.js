import { f7 } from 'framework7-react';

const Toast = (type, message, timeout, position) => {
    f7.toast.create({
        text: message,
        position: position || "bottom",
        closeTimeout: timeout || 2000,
        destroyOnClose: true,
        cssClass: "toast-" + type
    }).open();
};

export default Toast;