"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

function AddChallenge() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen}>Add Challenge</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-gray-800 text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Input type="text" label="Title" />
                <Input size="lg" type="textarea" label="Description" />
              </ModalBody>
              <ModalFooter className="bg-gray-800">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="text-white"
                >
                  Cancle
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddChallenge;
