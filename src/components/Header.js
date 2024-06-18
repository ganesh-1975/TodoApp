import React from "react";

function Header() {
  return (
    <div>
      <div className="bg-blue-600 text-white text-center py-3 font-light">
        If you've got tasks, start managing today!
      </div>

      <div className="w-[360px] mx-auto mt-10">
        <h1 className="text-xl text-black font-bold">
          Manage your task <span className="text-neutral-600">@ganesh</span>
        </h1>
        <p className="text-neutral-600">
          Add your tasks and start organizing them quickly.
        </p>
      </div>
    </div>
  );
}

export default Header;
