const Alert = ({ type, message }) => {
  const classes = "my-5 alert alert-" + type;
  return (
    <div className={classes} role="alert">
      {message}
    </div>
  );
};

export default Alert;
