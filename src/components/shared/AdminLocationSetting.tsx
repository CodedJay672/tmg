"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../Modal";

const AdminLocationSetting = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full my-6">
      <Button variant="link" onClick={() => setShowModal(true)}>
        Click here to set location charges.
      </Button>
      <Modal open={showModal} onOpenChange={setShowModal}>
        <p>checking</p>
      </Modal>
    </div>
  );
};

export default AdminLocationSetting;
