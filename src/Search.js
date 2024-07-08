import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState(""); // 검색어 저장할 상태변수
  const [results, setResults] = useState([]); // 검색 결과를 저장할 상태 변수
  const navigate = useNavigate(); /// 다른 페이지로 이동하기 위한 navigate 함수

  // 영화 검색
  const searchMovies = async (e) => {
    e.preventDefault(); // 리로드 방지
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=9d2bff12ed955c7f1f74b83187f188ae&query=${encodeURIComponent(
        query
      )}`
    );
    setResults(response.data.results); // 검색 결과를 results 상태 변수에 저장
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>영화 검색</h1>
      <form
        onSubmit={searchMovies}
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="영화 제목을 입력해 주세요."
          onChange={(e) => setQuery(e.target.value)} // 검색어 상태 업데이트
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
          }}
        >
          영화 찾기
        </button>
      </form>

      {/* 검색 결과 리스트 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            width: "60%",
            textAlign: "left",
          }}
        >
          {results.map((movie) => (
            <li
              key={movie.id}
              onClick={() => navigate(`/detail/${movie.id}`)} // // 클릭 시 detail로 이동
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(
                e // 커서
              ) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: "50px",
                    height: "75px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                />
              )}
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {movie.title}
                </div>
                <div style={{ fontSize: "14px", color: "#555" }}>
                  {movie.release_date} {/* 출시 날짜 */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
