import LogOut from "../auth/LogOut";
import { IoSettings } from "react-icons/io5";
import { FaUpload } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleviewUpload } from "../../lib/redux/User/userSlice";

function UserUI() {
  const dispatch = useDispatch();
  const handleViewrToggle = () => {
    dispatch(toggleviewUpload());
  };
  return (
    <div className='w-full bg-primary/5 flex justify-end items-center gap-5 p-5'>
      <p>
        Hi{" "}
        <span className='capitalize'>{localStorage.getItem("userName")} !</span>
      </p>
      <FaUpload
        onClick={handleViewrToggle}
        className='cursor-pointer text-[25px] text-primary transition-all duration-200 hover:text-primary/30 '
      />
      {/* <IoSettings className='cursor-pointer text-[25px] text-primary transition-all duration-200 hover:text-primary/30 ' /> */}
      <LogOut />
    </div>
  );
}

export default UserUI;
