import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import useTranslation from "hooks/useTranslation";

export default function LoginForm() {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const t = useTranslation();
    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            toast.success("성공적으로 로그인이 되었습니다.");
        } catch (error: any) {
            toast.error(error?.code);
        }
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "email") {
            setEmail(value);
            const validRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!value?.match(validRegex)) {
                setError("이메일 형식이 올바르지 않습니다");
            } else {
                setError("");
            }
        }
        if (name === "password") {
            setPassword(value);
            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상 입력해 주세요");
            } else {
                setError("");
            }
        }
    };
    const onClickSociallLogin = async (e: any) => {
        const {
            target: { name },
        } = e;

        let provider;
        const auth = getAuth(app);
        if (name === "google") {
            provider = new GoogleAuthProvider();
        }
        if (name === "github") {
            provider = new GithubAuthProvider();
        }

        await signInWithPopup(
            auth,
            provider as GithubAuthProvider | GoogleAuthProvider
        )
            .then((result) => {
                toast.success("로그인 되었습니다");
            })
            .catch((error) => {
                console.log(error);
                const errorMessage = error?.message;
                toast?.error(errorMessage);
            });
    };
    return (
        <form className="form form--lg" onSubmit={onSubmit}>
            <div className="form__title">{t("SIGNIN_LINK")}</div>
            <div className="form__block">
                <label htmlFor="email">{t("FORM_EMAIL")}</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    required
                    onChange={onChange}
                />
            </div>
            <div className="form__block">
                <label htmlFor="password">{t("FORM_PASSWORD")}</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={password}
                    required
                    onChange={onChange}
                />
            </div>
            {error && error?.length > 0 && (
                <div className="form__block">
                    <div className="form__error">{error}</div>
                </div>
            )}
            <div className="form__block">
                {t("NO_ACCOUNT")}
                <Link to="/users/signup" className="form__link">
                    {t("SIGNIN_LINK")}
                </Link>
            </div>
            <div className="form__block--lg">
                <button
                    type="submit"
                    className="form__btn--submit"
                    disabled={error?.length > 0}
                >
                    {t("SIGNIN_LINK")}
                </button>
            </div>
            <div className="form__block">
                <button
                    type="button"
                    className="form__btn--google"
                    name="google"
                    onClick={onClickSociallLogin}
                >
                    {t("LOGIN_WITH_GOOGLE")}
                </button>
            </div>
            <div className="form__block">
                <button
                    type="button"
                    className="form__btn--github"
                    name="github"
                    onClick={onClickSociallLogin}
                >
                    {t("LOGIN_WITH_GITHUB")}
                </button>
            </div>
        </form>
    );
}
