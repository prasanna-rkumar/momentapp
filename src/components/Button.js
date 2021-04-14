const Button = ({ children, isDisabled, onClick, isSecondary }) => {
  return <button onClick={onClick} className={`w-full h-9 mb-1 rounded border-2 border-transparent hover:border-blue-200 font-semibold ${isSecondary && 'bg-gray-400'}  ${isDisabled ? 'text-gray-300 bg-gray-400' : 'bg-blue-500'}`}>
    {children}
  </button>
};

export default Button;