import React from "react";
import { useEffect, useState } from "react";

//1. useEffect(callback)
// - Gọi callback mỗi khi component re-render
// - Gọi callback sau khi component thêm element vào DOM
//2. useEffect(callback, [])
// - Gọi callback 1 lần duy nhất sau khi component mounted, ko gọi lại callback sau khi re-render
//3. useEffect(callback, [deps])
// - Callback sẽ được gọi lại mỗi khi deps thay đổi
// --------------------
// 1. Callback luôn được gọi sau khi component mounted
// 2. Cleanup function luôn đuọcw gọi trước khi component unmount
const tabs = ["posts", "comments", "albums"];
export default function UseEffect() {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  const [showGoToTop, setShowGoToTop] = useState(false)
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type])
  
  useEffect(() => {
    const handleScroll = () => {
        console.log(window.scrollY)
        // Shorthand if else
        setShowGoToTop(window.scrollY >= 200) 
    }
    window.addEventListener('scroll', handleScroll) 

    // Cleanup function
    return () => {
        window.removeEventListener('scroll', handleScroll) 
        console.log('removeEventListener');
    }
  }, [])

  return (
    <div>
      {tabs.map(tab => (
        <button 
            key={tab}
            style={type === tab ? {backgroundColor: '#999'} : {}}
            onClick={() => setType(tab)}
        >
            {tab}
        </button>
      ))}
      <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title || post.name}</li>
            ))}
      </ul>
      {showGoToTop && (
        <button style={{position: 'fixed', right: 20, bottom: 20}}>Go to top</button>
      )}
    </div>
  );
}
