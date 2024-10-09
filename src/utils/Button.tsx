export const Button = ({
  text,
  classname,
  onClick,
  icon,
  type = 'button',
  disabled = false,
}: {
  text?: string;
  classname?: string;
  onClick?: () => void;
  icon?: string;
  type?: 'submit' | 'button' | undefined;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      className={classname}
      onClick={onClick}
      disabled={disabled}>
      {!icon && text}
      {icon && <img src={icon} />}
    </button>
  );
};
