import React from "react";
import { useNavigate } from "react-router-dom";

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

const BoardItem = (props: Board) => {
  const navigation = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: "14px",
        boxSizing: "border-box",
        cursor: "pointer",
      }}
      onClick={() => {
        navigation(`/board/${props.id}`);
      }}
    >
      <h1>{props.title}</h1>
      <p>{props.author.username}</p>
      <p>{props.createdAt}</p>
    </div>
  );
};

export default BoardItem;
