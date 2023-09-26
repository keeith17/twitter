import { useContext } from "react";
import { BsHouse } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout, MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";

export default function MenuList() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className="footer">
            <div className="footer__grid">
                <button type="button" onClick={() => navigate("/")}>
                    <BsHouse />
                    Home
                </button>
                <button type="button" onClick={() => navigate("/profile")}>
                    <FaUserCircle />
                    Profile
                </button>
                {user === null ? (
                    <button type="button" onClick={() => navigate("/")}>
                        <MdLogin />
                        Login
                    </button>
                ) : (
                    <button type="button" onClick={() => navigate("/")}>
                        <MdLogout />
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}
