import { useEffect, useState } from "react";

const BookCover = ({ isbn, imageURL, title }) => {
  const [cover, setCover] = useState(imageURL);

  useEffect(() => {
    if (!imageURL && isbn) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then((res) => res.json())
        .then((data) => {
          const img = data.items?.[0]?.volumeInfo?.imageLinks;
          const url = img?.smallThumbnail || img?.thumbnail;
          setCover(url);
        })
        .catch(console.error);
    }
  }, [isbn, imageURL]);

  return (
    <img
      src={cover || "/placeholder-img.avif"}
      alt={title}
      className="w-full h-64 object-cover rounded shadow"
    />
  );
};

export default BookCover;
