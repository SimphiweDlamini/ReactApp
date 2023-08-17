import React from "react";
import { useState } from "react";

interface Props {
  children: string;
  maxCharacters: number;
}

const ExpandableText = ({ children, maxCharacters }: Props) => {
  const paragrapgh = children;
  //"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const parChar = [...paragrapgh];
  const limitChar = parChar.map((value, index) =>
    index < maxCharacters ? value : null
  );
  const shortParagraph = limitChar.join("");
  const [less, setLess] = useState(true);
  if (less)
    return (
      <>
        {" "}
        <div>{shortParagraph}</div>
        <button onClick={() => setLess(false)}>See More</button>
      </>
    );

  return (
    <>
      <div>{paragrapgh}</div>
      <button onClick={() => setLess(true)}>See Less</button>
    </>
  );
};

export default ExpandableText;
