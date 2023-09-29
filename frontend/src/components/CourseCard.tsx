import { LockOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

interface CourseCardProps {
  name: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
  isOpen: boolean;
  id: number;
}

function CourseCard({
  name,
  description,
  image,
  author,
  tags,
  isOpen,
  id,
}: CourseCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      $isOpen={isOpen}
      onClick={() => {
        if (isOpen) navigate(`${id}`);
      }}
    >
      {!isOpen && (
        <LockOutlined
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "40%",
            fontWeight: "700",
            fontSize: "80px",
            zIndex: "100",
          }}
        />
      )}
      <CourseClosedImg $isOpen={isOpen}>
        <CourseImg
          src={image}
          style={{ width: "100%", height: "30vh" }}
          alt="Изображение курса"
        />
      </CourseClosedImg>
      <CardTextContent>
        <CourseName>{name}</CourseName>
        <CourseDescription>{description}</CourseDescription>
        <ExtraInfo>
          <FieldName>Автор курса: </FieldName>
          {author}
        </ExtraInfo>
        <ExtraInfo>
          <FieldName>Теги: </FieldName> {tags.join(", ")}
        </ExtraInfo>
      </CardTextContent>
    </Card>
  );
}

const FieldName = styled.span`
  font-size: 20px;
`;

const ExtraInfo = styled.p`
  padding-left: 2vw;
`;

const CourseDescription = styled.p`
  text-align: center;
`;

const CourseName = styled.p`
  font-size: 20px;
  text-align: center;
`;

const Card = styled.div<{ $isOpen: boolean }>`
  ${({ $isOpen }) =>
    $isOpen
      ? `background-color: #f7e8fc; cursor: pointer;`
      : `background-color: #D3D3D3; cursor: not-allowed; backdrop-filter: blur(20px);}`}
  width: 26vw;
  height: auto;
  border-radius: 20px;
  position: relative;
  @media (max-width: 920px) {
    width: 40vw;
  }
  @media (max-width: 720px) {
    width: 100%;
  }
`;

const CourseClosedImg = styled.div<{ $isOpen: boolean }>`
  ${({ $isOpen }) =>
    $isOpen
      ? ``
      : `background-color: #D3D3D3; opacity: 0.5; backdrop-filter: blur(20px);`}
  border-radius: 20px;
`;

const CardTextContent = styled.div`
  padding-left: 10px;
`;

const CourseImg = styled.img`
  border-radius: 20px;
`;

export default CourseCard;
