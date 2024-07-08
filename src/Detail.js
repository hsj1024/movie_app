import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); // 영화 ID를 URL 파라미터로 받음
  const [movie, setMovie] = useState(null); //영화 정보 저장 상태변수
  const [videos, setVideos] = useState([]); //영화의 비디오 클립 목록 상태변수
  const navigate = useNavigate();

  // 영화 정보 가져옴
  useEffect(() => {
    const getMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9d2bff12ed955c7f1f74b83187f188ae`
      );
      setMovie(response.data); // 응답 데이터 상태 변수에 저장
    };
    getMovie();
  }, [id]); // id가 변경될 때마다 useEffect 훅

  // 영화 비디오 클립 목록 가져옴
  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9d2bff12ed955c7f1f74b83187f188ae`
      );
      setVideos(response.data.results); // 응답 데이터 상태 변수에 저정
    };
    getVideos();
  }, [id]);

  if (!movie) return <div>로딩 중...</div>;

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5em", margin: "20px 0" }}>{movie.title}</h1>
      <img
        // 포스터 이미지
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "300px", borderRadius: "10px", marginBottom: "20px" }} // 이미지 스타일
      />
      <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>시놉시스</h2>

      <p style={{ fontSize: "1.2em", lineHeight: "1.6em", margin: "20px 0" }}>
        {movie.overview}
      </p>
      <br></br>
      <hr></hr>
      <br></br>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <p style={{ fontSize: "1.2em" }}>
          <strong>제목 :</strong> {movie.original_title}
        </p>
        <p style={{ fontSize: "1.2em" }}>
          <strong>최초 상영일 :</strong> {movie.release_date}
        </p>
        <p style={{ fontSize: "1.2em" }}>
          <strong>언어 :</strong> {movie.original_language}
        </p>
        <p style={{ fontSize: "1.2em" }}>
          <strong>인기 :</strong> {movie.popularity}
        </p>
        <p style={{ fontSize: "1.2em" }}>
          <strong>평점 :</strong> {movie.vote_average}
        </p>
        <p style={{ fontSize: "1.2em" }}>
          <strong>투표 수 :</strong> {movie.vote_count}
        </p>
        <p style={{ fontSize: "1.2em" }}>
          <strong>성인영화 여부 :</strong> {movie.adult ? "Yes" : "No"}
        </p>
        <p style={{ fontSize: "1.2em" }}>
          <strong>비디오 출시 여부 :</strong> {movie.video ? "Yes" : "No"}
        </p>
      </div>
      <br></br>
      <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>배경 이미지</h2>
      <img // 배경이미지
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt="backdrop"
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <div>
        <h2 style={{ fontSize: "2em", marginBottom: "20px" }}>
          <hr></hr>영상
        </h2>
        {videos.map((video) => (
          <div key={video.id} style={{ margin: "10px 0" }}>
            <h3 style={{ fontSize: "1.5em" }}>{video.name}</h3>
            <button
              onClick={() => navigate(`/youtube/${video.key}`)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Youtube 영상 보기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;
