import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";

const BoardForm = () => {
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!boardName) return;

    try {
      const response = await ApiService.createBoard(boardName);
      console.log("Board created successfully: ", response.data);
      navigate("/boards"); // 작성 완료 후 게시판 목록 페이지로 이동
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        게시판 이름:
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          required
        />
      </label>
      <button type="submit">게시판 추가</button>
    </form>
  );
};

export default BoardForm;
