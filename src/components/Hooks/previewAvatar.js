import { useState, useEffect } from "react";

export default function Content() {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    // Cleanup
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    // tao object preview cho file
    file.preview = URL.createObjectURL(file);
    // set avatar = file
    setAvatar(file);
  };
  return (
    <div>
      <input type="file" onChange={handlePreviewAvatar} />
      {avatar && <img src={avatar.preview} alt="" width="80%" />}
    </div>
  );
}
