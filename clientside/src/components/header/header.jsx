import React from "react";
import Typewriter from "typewriter-effect";

const Header = (props) => {
  return (
    <div className="text-center font-size-70 mt-5">
      <Typewriter
        options={{
          strings: ["Waqar's ChatRoom"],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default Header;
