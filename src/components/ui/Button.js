const Button = ({ children, onClick, type = "button" }) => (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 border border-black border-t-2 border-l-2 border-r-1 border-b-1 rounded-lg bg-blue-950 text-white hover:bg-blue-800 transition"
    >
      {children}
    </button>
  );
  
  export default Button;  