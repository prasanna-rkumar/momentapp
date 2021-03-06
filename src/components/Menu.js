import { useState, useRef, useEffect } from "react";

const Menu = ({ title, menuItems }) => {
  const [show, setShow] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!container?.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [show, container]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;

      if (event.key === "Escape") {
        setShow(false);
      }
    };

    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [show]);

  return (
    <div ref={container} className="relative">
      <button
        className="focus:outline-none"
        onClick={() => setShow(!show)}
      >
        {title}
      </button>

      {show && (
        <div>
          <div className="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-gray-200 rounded shadow-md">
            {menuItems.map((menuItem, index) => (
              <div key={index} className="cursor-pointer text-gray-800 h-8 hover:bg-blue-500 hover:text-blue-50">
                {menuItem}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
