import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginData {
  username: string;
  password: string;
}

const Login = () => {
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
        "https://api.cher1shrxd.me/auth/login",
        loginData
      );
      if (res) {
        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
        alert("로그인 성공!");
        navigate("/");
      }
    } catch (err: any) {
      if (err.response.statusCode === 401) {
        alert("비밀번호가 올바르지 않습니다.");
        return;
      }

      if (err.response.statusCode === 404) {
        alert("유저를 찾을 수 없습니다.");
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
        <b>~로그인~</b>
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
      <button onClick={submit}>로그인</button>
    </div>
  );
};

export default Login;
