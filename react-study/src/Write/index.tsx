import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Write {
  title: string;
  detail: string;
  category: "FREE";
}

const Write = () => {
  const [writeData, setWriteData] = useState<Write>({
    title: "",
    detail: "",
    category: "FREE",
  });
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const navigate = useNavigate();

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWriteData((prev) => ({ ...prev, [name]: value }));
    console.log(writeData);
  };

  const submit = async () => {
    try {
      const res = await axios.post(
        "https://gaon.cher1shrxd.me/boards",
        writeData,
        { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
      );
      if (res) {
        alert("글 작성 성공");
        navigate("/");
      }
    } catch (err) {
      console.log();
      alert("네트워크 오류");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <h1>글쓰기</h1>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        style={{ width: "300px", padding: "10px" }}
        name="title"
        value={writeData.title}
        onChange={handleForm}
      />
      <textarea
        placeholder="내용을 입력해주세요"
        style={{
          width: "300px",
          height: "300px",
          resize: "none",
          padding: "10px",
        }}
        name="detail"
        value={writeData.detail}
        onChange={handleForm}
      ></textarea>
      <button onClick={submit}>게시</button>
    </div>
  );
};

export default Write;
