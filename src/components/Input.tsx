import type { InputProps } from "../types/input";

export default function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ padding: "6px", marginBottom: "10px", width: "100%" }}
    />
  );
}
