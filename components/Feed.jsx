"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, setSearchText }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            setSearchText={setSearchText}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };
    fetchPost();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const filteredPosts = posts.filter(
      (p) =>
        p.prompt.toLowerCase().includes(searchText) ||
        p.tag.toLowerCase().includes(searchText) ||
        p.creator.email.includes(searchText)
    );

    setFilteredPosts(filteredPosts);
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText ? filteredPosts : posts}
        setSearchText={setSearchText}
      />
    </section>
  );
};

export default Feed;
