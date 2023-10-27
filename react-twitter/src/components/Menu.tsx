import { useContext } from "react";
import { BsHouse } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout, MdLogin } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import useTranslation from "hooks/useTranslation";

export default function MenuList() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const t = useTranslation();
    return (
        <div className="footer">
            <div className="footer__grid">
                <button type="button" onClick={() => navigate("/")}>
                    <BsHouse />
                    {t("MENU_HOME")}
                </button>
                <button type="button" onClick={() => navigate("/profile")}>
                    <FaUserCircle />
                    {t("MENU_PROFILE")}
                </button>
                <button type="button" onClick={() => navigate("/search")}>
                    <AiOutlineSearch />
                    {t("MENU_SEARCH")}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/notifications")}
                >
                    <IoMdNotificationsOutline />
                    {t("MENU_NOTI")}
                </button>
                {user === null ? (
                    <button type="button" onClick={() => navigate("/")}>
                        <MdLogin />
                        {t("MENU_LOGIN")}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={async () => {
                            const auth = getAuth(app);
                            await signOut(auth);
                            toast.success("로그아웃 되었습니다");
                        }}
                    >
                        <MdLogout />
                        {t("MENU_LOGOUT")}
                    </button>
                )}
            </div>
        </div>
    );
}
