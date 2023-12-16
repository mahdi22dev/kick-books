import React from "react";
import { Link } from "react-router-dom";

function FormRedirect({ text, path }) {
  return (
    <div className='font-normal mt-2 '>
      You don't have an account? {text} from{" "}
      <Link
        className='text-secondary hover:text-secondary/60 transition-all duration-300'
        to={path}
      >
        here
      </Link>
    </div>
  );
}

export default FormRedirect;
