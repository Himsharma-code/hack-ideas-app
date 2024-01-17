"use client";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
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
import { TaskProps } from "@/app/dashboard/page";
import { request } from "@/utils/request";

function AddChallenge() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState<
    Pick<TaskProps, "title" | "description"> & { tags: TagProps[] }
  >({
    title: "",
    description: "",
    tags: [],
  });

  const [error, setError] = useState("");
  console.log("task", task);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChallenge = async () => {
    // Basic validation
    if (
      !task.title.trim() ||
      !task.description.trim() ||
      task.tags.length === 0
    ) {
      setError("All fields are required");
      return;
    }

    // Reset error message
    setError("");
    const payload = {
      ...task,
      tags: task.tags.map((v) => v.value),
    };
    try {
      const response = await request("/api/users/addTask", "POST", payload);

      if (response.success) {
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // Perform your add challenge logic here

    // Close the modal
    onClose();
  };

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
              <ModalBody className="text-white">
                <Input
                  variant="bordered"
                  type="text"
                  label="Title"
                  value={task.title}
                  name="title"
                  onChange={handleChange}
                />
                <Input
                  name="description"
                  variant="bordered"
                  size="lg"
                  type="textarea"
                  label="Description"
                  value={task.description}
                  onChange={handleChange}
                />
                <Select
                  classNames={{
                    base: "",
                    listboxWrapper: "bg-gray-700 p-0",
                    popoverContent: "p-0",
                  }}
                  name="tags"
                  placeholder="Select a tag"
                  disabledKeys={task.tags.map((d) => d.value)}
                  onChange={({ target: { value, name } }) => {
                    const tagClone = [...tags];
                    const selectedItemIndex = tagClone.findIndex(
                      (v) => v.value === value
                    );

                    if (selectedItemIndex === -1) return;
                    setError("");
                    setTask((prev) => ({
                      ...prev,
                      [name]: [...prev.tags, tagClone[selectedItemIndex]],
                    }));
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
                  {task.tags.map((tag) => {
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
                {error && <p className="text-red-500">{error}</p>}
              </ModalBody>
              <ModalFooter className="bg-gray-800">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="text-white"
                >
                  Cancel
                </Button>
                <Button color="primary" onPress={handleAddChallenge}>
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
