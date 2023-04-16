import axios from "axios";
import { MouseEvent, useEffect, useRef, useState } from "react";
import * as S from "./chatbotStyles";

interface IChatbot {
  isToggle: boolean;
  changeIsToggle: () => void;
}

interface IMessage {
  speaker: string;
  message: string;
}

export default function Chatbot(props: IChatbot): JSX.Element {
  const [answer, setAnswer] = useState<IMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = async (): Promise<void> => {
    setInputValue("");
    const newAnswer: IMessage[] = [
      ...answer,
      { speaker: "user", message: inputValue },
    ];
    setAnswer(newAnswer);
    setAnswer([
      ...newAnswer,
      { speaker: "chatbot", message: "잠시만 기다려주세요..." },
    ]);
    try {
      const result = await axios({
        method: "POST",
        url: "https://jjjbackendclass.shop/info/channel",
        data: {
          question: inputValue,
        },
      });

      const botAnswer = result.data;
      const finalAnswer: IMessage[] = [
        ...newAnswer,
        { speaker: "chatbot", message: botAnswer },
      ];
      setAnswer(finalAnswer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (chatEndRef.current != null) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [answer]);

  useEffect(() => {
    if (!props.isToggle) {
      setAnswer([]);
    }
  }, [props.isToggle]);

  const onChat = (e: MouseEvent<HTMLButtonElement>): void => {
    switch (e.currentTarget.id) {
      case "answer1":
        onAnswer("맛집 찾으시나요?", "맛집 페이지 이동 후 검색을 해주세요.");
        break;
      case "answer2":
        onAnswer(
          "코스 작성 방법이 궁금하신가요?",
          "코스 명을 입력 후 다음 버튼을 눌러주세요. 그리고 원하시는 음식점을 지도에서 찾아 클릭 후 추가 해주세요."
        );
        break;
      default:
        break;
    }
  };

  const onAnswer = (userAnswer: string, botAnswer: string): void => {
    const newAnswer: IMessage[] = [
      ...answer,
      { speaker: "user", message: userAnswer },
      { speaker: "chetbot", message: "잠시만 기다려주세요..." },
    ];

    setAnswer(newAnswer);

    setTimeout(() => {
      setAnswer([...newAnswer, { speaker: "chetbot", message: botAnswer }]);
    }, 1300);
  };

  const ChatBot = ({ message }: { message: string }): JSX.Element => {
    return (
      <S.ChatBotText>
        <img src="/logoIcon_bk.webp" />
        <div>{message}</div>
      </S.ChatBotText>
    );
  };

  const UserChet = ({ message }: { message: string }): JSX.Element => {
    return (
      <S.UserText>
        <div>{message}</div>
      </S.UserText>
    );
  };

  return (
    <S.Container isToggle={props.isToggle}>
      <S.Header>
        <img src="/chatbotLogo.webp" />
        <button onClick={props.changeIsToggle}></button>
      </S.Header>
      <S.FAQBox>
        <button onClick={onChat} id="answer1">
          맛집 찾나요?
        </button>
        <button onClick={onChat} id="answer2">
          코스 작성 방법이 궁금하신가요?
        </button>
      </S.FAQBox>
      <S.Content>
        {answer.map((item, index) => {
          if (item.speaker === "user") {
            return <UserChet key={index} message={item.message} />;
          } else {
            return <ChatBot key={index} message={item.message} />;
          }
        })}
        <div ref={chatEndRef} />
      </S.Content>

      <S.ChatInput>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        <button
          onClick={() => {
            void handleSubmit();
          }}
        ></button>
      </S.ChatInput>
    </S.Container>
  );
}
