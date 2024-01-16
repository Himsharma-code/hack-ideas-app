"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { TagProps, getLabel, getTagColor, tags } from "@/utils/constants";

function AddChallenge() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState<TagProps[]>([]);

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
              <ModalBody className="text-white ">
                <Input variant="bordered" type="text" label="Title" />
                <Input
                  variant="bordered"
                  size="lg"
                  type="textarea"
                  label="Description"
                />
                <Select
                  classNames={{
                    base: "",
                    listboxWrapper: "bg-gray-700 p-0",
                    popoverContent: "p-0",
                  }}
                  placeholder="Select a tag"
                  disabledKeys={selectedItems.map((d) => d.value)}
                  onChange={({ target: { value } }) => {
                    const tagClone = [...tags];
                    const selectedItemIndex = tagClone.findIndex(
                      (v) => v.value === value
                    );

                    if (selectedItemIndex === -1) return;

                    setSelectedItems((prev) => [
                      ...selectedItems,
                      tagClone[selectedItemIndex],
                    ]);
                  }}
                  variant="bordered"
                  label="Select a tag"
                >
                  {tags.map((tag) => (
                    <SelectItem
                      hideSelectedIcon
                      key={tag.value}
                      value={tag.value}
                    >
                      {tag.label}
                    </SelectItem>
                  ))}
                </Select>
                <div className="flex gap-4">
                  {selectedItems.map((tag) => {
                    return (
                      <Chip
                        key={tag.value}
                        color={getTagColor[tag.value] ?? "default"}
                      >
                        {getLabel[tag.value] ?? "Other"}
                      </Chip>
                    );
                  })}
                </div>
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
