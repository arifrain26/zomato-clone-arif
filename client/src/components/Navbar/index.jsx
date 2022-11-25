import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

//component
import Signin from "../Auth/Signin";
import Signup from "../Auth/Signup";

//redux
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/reducers/auth/auth.action";
import { clearUser } from "../../redux/reducers/user/user.action";

const MobileNav = ({
  user,
  isDropdownOpen,
  setIsDropdownOpen,
  signIn,
  signUp,
}) => {
  const SignIn = () => {
    signIn();
    setIsDropdownOpen(false);
  };

  const SignUp = () => {
    signUp();
    setIsDropdownOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = () => {
    dispatch(signOut());
    dispatch(clearUser());
    navigate("/delivery");
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between lg:hidden">
        <Link className="w-28">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt=""
            className="w-full h-full"
          />
        </Link>
        <div className="flex items-center gap-3 relative">
          <button className="bg-zomato-400 text-white py-2 px-3 rounded-full">
            Use App
          </button>
          {user?.fullName ? (
            <>
              <div
                className="border border-gray-300 text-zomato-400 w-9 h-9 rounded-full"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667190195~exp=1667190795~hmac=13684104fd4165562a220f48bc47ed34cae40dd727d3d90d87576e710f067b0a"
                  className="w-full h-full rounded-full object-center"
                  alt="avatar"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute shadow-lg py-3 bg-white -bottom-16 w-full z-20 flex flex-col border border-gray-200">
                  <button onClick={SignOut}>Sign Out</button>
                </div>
              )}
            </>
          ) : (
            <>
              <span
                className="border p-2 border-gray-400 rounded-full"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <FaUserAlt className="w-full h-full" />
              </span>

              {isDropdownOpen && (
                <div className="absolute shadow-lg py-3 -bottom-24 -right-4 w-full z-20 flex flex-col gap-2 bg-white border border-gray-200">
                  <button onClick={SignIn}>Sign In</button>
                  <button onClick={SignUp}>Sign Up</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const LargeNav = ({
  user,
  setIsDropdownOpen,
  isDropdownOpen,
  signIn,
  signUp,
}) => {
  const SignIn = () => {
    signIn();
    setIsDropdownOpen(false);
  };

  const SignUp = () => {
    signUp();
    setIsDropdownOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = () => {
    dispatch(signOut());
    dispatch(clearUser());
    navigate("/delivery");
    setIsDropdownOpen(false);
  };
  return (
    <>
      <div className="px-14 w-full items-center justify-between hidden lg:flex container mx-auto">
        <div className="gap-4 justify-around items-center flex">
          <div className="w-20">
            <Link>
              <img
                src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                alt="logo"
                className="w-full h-full"
              />
            </Link>
          </div>
        </div>
        <div className="bg-white w-3/4 shadow-md p-3 flex items-center gap-3 border border-gray-200 rounded">
          <div className="flex items-center gap-2 border-r-2 border-gray-200 pr-2">
            <span className="text-zomato-400">
              <HiLocationMarker />
            </span>
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Gwalior"
            />
            <IoMdArrowDropdown />
          </div>

          <div className="flex w-full items-center gap-2">
            <RiSearch2Line />
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Search for restaurant, cuisine or a dish"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 relative">
          {user?.fullName ? (
            <>
              <div
                className="border border-gray-300 text-zomato-400 w-9 h-9 rounded-full"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1667190195~exp=1667190795~hmac=13684104fd4165562a220f48bc47ed34cae40dd727d3d90d87576e710f067b0a"
                  className="w-full h-full rounded-full object-center"
                  alt="avatar"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute shadow-lg py-3 -bottom-14 -right-0 w-36 z-20 flex flex-col gap-2 bg-white border border-gray-200">
                  <button onClick={SignOut}>Sign Out</button>
                </div>
              )}
            </>
          ) : (
            <>
              <span
                className="border p-2 border-gray-400 rounded-full"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <FaUserAlt className="w-full h-full" />
              </span>

              {isDropdownOpen && (
                <div className="absolute shadow-lg py-3 -bottom-24 -right-4 w-36 z-20 flex flex-col gap-2 bg-white border border-gray-200">
                  <button onClick={SignIn}>Sign In</button>
                  <button onClick={SignUp}>Sign Up</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const openSignInModal = () => setOpenSignIn(true);
  const openSignUpModal = () => setOpenSignUp(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const user = {
  //   // fullName: "Arif",
  // };

  const user = useSelector((globalState) => globalState.user);

  return (
    <>
      <Signin isOpen={openSignIn} setIsOpen={setOpenSignIn} />
      <Signup isOpen={openSignUp} setIsOpen={setOpenSignUp} />

      <nav className="p-4 lg:py-2 flex bg-white shadow-md lg:shadow-none lg:border-b-2 border-gray-100 w-full items-center">
        <MobileNav
          user={user}
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
          signIn={openSignInModal}
          singUp={openSignUpModal}
        />

        <LargeNav
          user={user}
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
          signIn={openSignInModal}
          signUp={openSignUpModal}
        />
      </nav>
    </>
  );
};

export default Navbar;
