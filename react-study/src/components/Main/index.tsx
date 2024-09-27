import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardItem from "../BoardItem";
import instance from "../../libs/axios/instance";

interface Board {
  title: string;
  detail: string;
  createdAt: string;
  category: string;
  author: User;
  id: number;
  likesCount: number;
}
interface User {
  id: number;
  username: string;
  board: Board[];
}

const Main = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);

  const getMe = async () => {
    try {
      const res = await instance.get("/auth/me");
      if (res) {
        setUser(res.data);
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };

  const getBoard = async () => {
    try {
      const res = await axios.get("https://gaon.cher1shrxd.me/boards");
      if (res) {
        setBoards(res.data);
      }
    } catch {
      alert("네트워크 에러");
    }
  };

  useEffect(() => {
    getMe();
    getBoard();
  }, []);

  return (
    <div style={{ display: "flex", width: "100vw", flexDirection: "column" }}>
      <p>{user ? user.username : "유저가 없습니다."}</p>
      <Link to="/write">글쓰기</Link>
      <div style={{ width: "100%", overflowY: "scroll" }}>
        {boards.map((item: Board) => (
          <BoardItem
            title={item.title}
            author={item.author}
            createdAt={item.createdAt}
            id={item.id}
            detail={item.detail}
            category={item.category}
            likesCount={item.likesCount}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
