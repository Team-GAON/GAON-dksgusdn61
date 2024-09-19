import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Board {
  title: string;
  detail: string;
  createdAt: string;
  category: string;
  author: string;
  id: number;
  likesCount: number;
}

interface User {
  id: number;
  username: string;
  board: Board[];
}

const Main = () => {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const getMe = async () => {
    try {
      const res = await axios.get("https://gaon.cher1shrxd.me/auth/me", {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      if (res) {
        setUser(res.data);
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        {user ? user.username : "유저가 없습니다."}
      </h1>
    </div>
  );
};

export default Main;
