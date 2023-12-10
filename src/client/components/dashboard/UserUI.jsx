import LogOut from "../auth/LogOut";
import { IoSettings } from "react-icons/io5";
function UserUI() {
  return (
    <div className='w-full bg-primary/5 flex justify-end items-center gap-5 p-5'>
      <p>
        Hi <span className='capitalize'>Mahdi !</span>
      </p>
      <IoSettings className='cursor-pointer text-[25px] text-primary transition-all duration-200 hover:text-primary/30 ' />
      <LogOut />
    </div>
  );
}

export default UserUI;
