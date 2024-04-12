import React from "react";
import { CSSTransition } from "react-transition-group";
import DataForm from "./DataForm";

const PopupForm: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="popup" unmountOnExit>
      <div className="popup">
        <DataForm />
      </div>
    </CSSTransition>
  );
};

export default PopupForm;
