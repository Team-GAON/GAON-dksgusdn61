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
  const [isLike, setIsLike] = useState<boolean>(false);

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

  const getLike = async (id: string) => {
    const res = await instance.get(`/likes/${id}`);
    // if (res) {
    //   setIsLike(res.data);
    // }
  };

  const like = async () => {
    if (params.id) {
      await instance.post(`/likes/${params.id}`);
      setIsLike(true);
      getLike(params.id);
    }
  };

  const unLike = async () => {
    if (params.id) {
      await instance.delete(`/likes/${params.id}`);
      setIsLike(false);
      getLike(params.id);
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
      <hr />
      <button onClick={isLike ? unLike : like}>
        <img
          src={isLike ? "/assets/like.svg" : "/assets/unlike.svg"}
          alt="like"
        />
      </button>
    </div>
  );
};

export default BoardDetail;
