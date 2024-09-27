import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const BoardDetail = () => {
  const [board, setBoard] = useState<Board>();
  const params = useParams();

  const boardReq = async () => {
    try {
      const res = await instance.get(`/boards/${params.id}`);
      if (res) {
        setBoard(res.data);
      }
    } catch {
      alert("네트워크 에러");
    }
  };

  useEffect(() => {
    if (params.id) {
      boardReq();
    }
  }, [params.id]);

  return (
    <div>
      <h1>{board?.title}</h1>
      <hr />
      <p>{board?.detail}</p>
      <hr />
      <p>{board?.author.username}</p>
      <hr />
      <p>{board?.createdAt}</p>
    </div>
  );
};

export default BoardDetail;
