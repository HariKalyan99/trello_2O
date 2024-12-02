import React, { useEffect, useRef } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import TrelloNavigation from "../TrelloNavigation";
import TrelloInternalListCard from "./TrelloInternalListCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  getListsOfBoards,
} from "../../slices/boardInternalSlices/boardListSlice";
import { useParams } from "react-router-dom";
import { GrDomain } from "react-icons/gr";

const TrelloBoardInternal = () => {
  const addListRef = useRef("");
  const { listsOfBoard, listsPending } = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  let { boardId } = useParams();
  useEffect(() => {
    if(boardId){
      dispatch(getListsOfBoards(boardId));
    }
  }, [dispatch]);

  return (
    <Container fluid className="min-vh-100 my-5">
      <TrelloNavigation boardIdPage />
      <div className="scrollContainer">
        {!listsPending &&
          listsOfBoard?.length > 0 &&
          listsOfBoard.map((list) => (
            <TrelloInternalListCard key={list.id} list={list} />
          ))}
        <Card
          style={{ height: "20%", minWidth: "20rem", width: "20rem" }}
          className="bg-dark text-light"
        >
          <Card.Body>
            <InputGroup className="d-flex flex-column gap-3">
              <form
                className="d-flex flex-column gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if(addListRef.current.value?.length > 0){
                    dispatch(
                      addList({ boardId, name: addListRef.current.value })
                    );
                    addListRef.current.value = "";
                  }
                  
                }}
              >
                <InputGroup className="d-flex">
                  <InputGroup.Text
                    id="inputGroup-sizing-default"
                    className="bg-dark"
                  >
                    <GrDomain className="text-light" />
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="name your list"
                    className="bg-light"
                    ref={addListRef}
                  />
                </InputGroup>
                <Button variant="secondary" type="submit">
                  Add List +
                </Button>
              </form>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default TrelloBoardInternal;
