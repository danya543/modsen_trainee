export const Button = ({
  text,
  classname,
  onClick,
  icon,
}: {
  text?: string;
  classname?: string;
  onClick: () => void;
  icon?: string;
}) => {
  return (
    <button className={classname} onClick={onClick}>
      {!icon && text}
      {icon && <img src={icon} />}
    </button>
  );
};
