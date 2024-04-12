// pages/ModeratorPage.tsx
import React, { useState } from "react";
import PopupForm from "../components/PopupForm";
import Button from "../components/Button";

const ModeratorPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const goToTablePage = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <Button label="Back to Table Page" onClick={goToTablePage} />
      <h1>Add User</h1>
      <Button label="Open Form" onClick={() => setIsOpen(true)} />
      <PopupForm isOpen={isOpen} />
    </div>
  );
};

export default ModeratorPage;
