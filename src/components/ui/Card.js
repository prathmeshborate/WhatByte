const Card = ({ children }) => (
    <div className="border rounded-lg shadow p-4 bg-white">{children}</div>
  );
  
  export const CardContent = ({ children }) => (
    <div className="space-y-2">{children}</div>
  );
  
export default Card;