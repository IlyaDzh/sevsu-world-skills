import { Modal } from "antd";

export default ({
    title,
    icon,
    okText = "Да",
    cancelText = "Нет",
    okType,
    onOk,
    onCancel
}) =>
    Modal.confirm({
        centered: true,
        title: title,
        icon: icon,
        okText: okText,
        okType: okType,
        cancelText: cancelText,
        onOk: onOk,
        onCancel: onCancel
    });
