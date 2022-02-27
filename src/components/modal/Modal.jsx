import React from "react";

import s from "./Modal.module.css";

export default function Modal({ closeModal, isModalVisible, children }) {
  return (
    <div
      className={isModalVisible ? `${s.modal} ${s.active}` : s.modal}
      onClick={() => closeModal(false)}
    >
      <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
