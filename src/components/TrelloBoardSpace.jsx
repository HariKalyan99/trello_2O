import React, { useRef, useState } from "react";
import { Card, Container, Overlay, Popover, Spinner } from "react-bootstrap";
const boardBg = {
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  boxShadow: "1px 1px 20px rgb(253, 130, 151)",
};
import TrelloNavigation from "./TrelloNavigation";
import TrelloBoardCard from "./TrelloBoardCard";
import { MdAddCard } from "react-icons/md";
import { TbBallpenOff } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { postNewBoard } from "../slices/boardSlice";

const TrelloBoardSpace = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const boardInputRef = useRef("");

  const { boardList, postBoardPending, delBoardPending } = useSelector(
    (state) => state.boards
  );
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleBoardSubmit = (e) => {
    e.preventDefault();
    if(boardInputRef.current.value?.length > 0){
      dispatch(postNewBoard(boardInputRef.current.value));
      boardInputRef.current.value = "";
      setShow(!show);
    }
  };
  return (
    <Container fluid className="min-vh-100 my-5">
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Body>

            <Container className="w-100 h-100">
              <form
                id="boardForm"
                className="w-100 h-100 d-flex justify-content-center align-items-center gap-2"
                onSubmit={(e) => handleBoardSubmit(e)}
              >
                <label id="boardForm"></label>
                <input
                  type="text"
                  placeholder="Enter a board name"
                  className="w-75 p-2 border"
                  ref={boardInputRef}
                />
                <button type="submit" className="btn btn-dark">
                  <MdAddCard />
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => setShow(!show)}
                >
                  <TbBallpenOff style={{ color: "rgb(245, 103, 126)" }} />
                </button>
              </form>
            </Container>
          </Popover.Body>
        </Popover>
      </Overlay>

      <TrelloNavigation />

      <Container className="h-auto position-relative">
        <Container
          className="w-100 d-flex justify-center align-items-center"
          style={{ height: "10rem" }}
        >
          <h1 className="position-absolute top-7">
            Work
            <span
              className="position-relative z-n1"
              style={{ color: "rgb(255, 100, 120)" }}
            >
              space
            </span>{" "}
          </h1>
        </Container>
        <Container
          className="min-h-auto w-100 d-flex flex-column gap-5 border border-light boardContainerHeight"
          style={boardBg}
        >
          <Container fluid className="d-flex align-items-center gap-2">
            <h1 className="text-decoration-underline text-left">Boards</h1>

            {postBoardPending && (
              <Spinner
                animation="grow"
                className="d-flex align-items-center justify-content-center"
              >
                <Spinner animation="grow" size="sm" className="bg-secondary" />
              </Spinner>
            )}

            {delBoardPending && (
              <Spinner
                animation="grow"
                className="d-flex align-items-center justify-content-center"
              >
                <Spinner animation="grow" size="sm" className="bg-secondary" />
              </Spinner>
            )}
          </Container>
          <Container
            className="min-h-auto h-75 d-flex flex-wrap gap-3 justify-content-start align-items-start" // media query!!
            ref={ref}
          >
            <Card
              border="light"
              style={{ width: "18rem", height: "7rem" }}
              className="card-add-hover"
              onClick={handleClick}
            >
              <span
                className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark"
              >
                {10 - boardList.length} boards left!
              </span>

              <Card.Body className="d-flex justify-content-center align-items-center">
                <Card.Title>Add a Board +</Card.Title>
              </Card.Body>
            </Card>
            {boardList.map((board, ind) => (
              <TrelloBoardCard key={ind} board={board} />
            ))}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default TrelloBoardSpace;
