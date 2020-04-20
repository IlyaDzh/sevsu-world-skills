import React from "react";
import PropTypes from "prop-types";
import { Modal as BaseModal, Button } from "antd";

const Modal = ({
    title,
    visible,
    setVisible,
    isSubmitting,
    handleSubmit,
    okText = "Ок",
    cancelText = "Назад",
    children
}) => (
    <BaseModal
        title={title}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
            <Button key="back" onClick={() => setVisible(false)}>
                {cancelText}
            </Button>,
            <Button
                key="submit"
                type="primary"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
            >
                {okText}
            </Button>
        ]}
        centered
    >
        {children}
    </BaseModal>
);

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default Modal;
