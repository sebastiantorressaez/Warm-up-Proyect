import { DeleteButtonProps } from "@/types/article";
import styles from "./DeleteButton.module.css";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteButton({
  onClick,
  className,
}: DeleteButtonProps) {
  return (
    <button
      className={`${styles.deleteButton} ${className ?? ""}`}
      onClick={onClick}
    >
      <FiTrash2 size={20} />
    </button>
  );
}
