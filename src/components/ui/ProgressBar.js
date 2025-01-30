const ProgressBar = ({ value, colorClass }) => (
  <div className="w-11/12 bg-gray-200 rounded-full h-2"> {/* Adjust width here */}
    <div
      style={{ width: `${value}%` }}
      className={`h-full rounded-full ${colorClass}`}
    ></div>
  </div>
);
  
  export default ProgressBar;  