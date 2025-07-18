import { IconProps } from "@/components/types";

export function ParagraphIcon({
  width = 24,
  height = 24,
  color,
  className,
  onClick,
  "aria-label": ariaLabel = "Knowledge Management Icon",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      role="img"
    >
      <path
        d="M7.66299 12.9455L6.8176 15.3727C6.74715 15.5727 6.63267 15.7273 6.47415 15.8364C6.31564 15.9455 6.13952 16 5.94578 16C5.61115 16 5.35137 15.8591 5.16644 15.5773C4.98151 15.2955 4.95069 15 5.07397 14.6909L8.71973 4.65455C8.79018 4.45455 8.90906 4.29545 9.07638 4.17727C9.2437 4.05909 9.42422 4 9.61796 4H10.3577C10.5514 4 10.7363 4.05909 10.9125 4.17727C11.0886 4.29545 11.2119 4.45455 11.2823 4.65455L14.9281 14.7182C15.0514 15.0273 15.0161 15.3182 14.8224 15.5909C14.6287 15.8636 14.3733 16 14.0563 16C13.8625 16 13.6864 15.9409 13.5279 15.8227C13.3694 15.7045 13.2549 15.5455 13.1845 15.3455L12.3655 12.9455H7.66299ZM8.27061 11.2H11.7314L10.0407 6.23636H9.93498L8.27061 11.2Z"
        fill={color ? color : "var(--icon-primary)"}
      />
    </svg>
  );
}
