import "./Button.css";

export function Button({
  children,
  icon,
  variant = "default",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-label">{children}</span>
    </button>
  );
}
