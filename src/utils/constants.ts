export type TagProps = {
  label: string;
  value: string;
};

export const getLabel: { [key: string]: string } = {
  frontend: "Frontend",
  backend: "Backend",
  dsa: "DSA",
  ai: "AI",
  ml: "ML",
};

export type TagTypes =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "default"
  | undefined;

export const getTagColor: { [key: string]: TagTypes } = {
  frontend: "primary",
  backend: "secondary",
  dsa: "success",
  ai: "warning",
  ml: "danger",
};

export const tags: TagProps[] = [
  {
    label: "Frontend",
    value: "frontend",
  },
  {
    label: "Backend",
    value: "backend",
  },
  {
    label: "DSA",
    value: "dsa",
  },
  {
    label: "AI",
    value: "ai",
  },
  {
    label: "ML",
    value: "ml",
  },
];

export const secretKey = "yourSecretKey";

export function formatTimestampToDDMMYYYY(timestamp: string) {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
