import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginData {
  username: string;
  password: string;
}

const Signup = () => {
  const [loginData, setloginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setloginData((prev) => ({ ...prev, [name]: value }));
    // console.log(loginData);
  };

  const submit = async () => {
    try {
      const res = await axios.post(
        "https://gaon.cher1shrxd.me/auth/signup",
        loginData
      );
      if (res) {
        alert("회원가입 성공!");
        navigate("/login");
      }
    } catch (err: any) {
      if (err.response.statusCode === 409) {
        alert("이미 사용 중인 아이디입니다.");
        return;
      }
      alert("네트워크 에러");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontStyle: "pretendard",
          fontSize: "1,7rem",
          fontWeight: "400",
        }}
      >
        회원가입
      </h1>
      <input
        type="text"
        placeholder="아이디"
        style={{ marginBottom: "20px" }}
        name="username"
        onChange={handleForm}
        value={loginData.username}
      />
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        style={{ marginBottom: "20px" }}
        onChange={handleForm}
        value={loginData.password}
      />
      <button onClick={submit}>회원가입</button>
    </div>
  );
};

export default Signup;
