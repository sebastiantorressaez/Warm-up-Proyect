import { DeleteButtonProps } from "@/types/article";
import styles from "./DeleteButton.module.css";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteButton({
  onClick,
  className,
  isLoading,
}: DeleteButtonProps) {
  return (
    <button
      className={`${styles.deleteButton} ${className ?? ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? "Eliminando..." : <FiTrash2 size={20} />}
    </button>
  );
}
