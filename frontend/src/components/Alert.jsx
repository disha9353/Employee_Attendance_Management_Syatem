const Alert = ({ type = 'info', message, onClose }) => {
  const types = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 ${types[type]} rounded`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <p className="font-medium">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-lg font-bold leading-none opacity-75 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;

