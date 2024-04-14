import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopupForm from "../components/PopupForm";
import Button from "../components/Button";

const ModeratorPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Link to="/">
        <Button label="Back to Table Page" />
      </Link>
      <h1>Add User</h1>
      <Button label="Open Form" onClick={() => setIsOpen(true)} />
      <PopupForm isOpen={isOpen} />
    </div>
  );
};

export default ModeratorPage;
