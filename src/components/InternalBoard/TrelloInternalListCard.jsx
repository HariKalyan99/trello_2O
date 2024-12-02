import React, { useEffect, useRef } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { MdFolderDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addCard,
  deleteList,
} from "../../slices/boardInternalSlices/boardListSlice";
import TrelloListCard from "./TrelloListCard";
import { MdLibraryAdd } from "react-icons/md";

let APIKey = import.meta.env.VITE_APIKEY;
let APIToken = import.meta.env.VITE_APITOKEN;
const TrelloInternalListCard = ({ list }) => {
  const addCardRef = useRef("");
  const dispatch = useDispatch();

  return (
    <Card
      style={{ height: "20%", minWidth: "20rem", width: "20rem" }}
      className="bg-dark text-light"
    >
      <Card.Body className="d-flex flex-column gap-3">
        <Card.Title className="d-flex justify-content-between align-items-center">
          {list.name}{" "}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(deleteList(list.id));
            }}
          >
            <MdFolderDelete className="fs-2 delHover" />
          </div>
        </Card.Title>
        {list.cardData?.length > 0 && (
          <ListGroup>
            {list?.cardData.map((card) => (
              <TrelloListCard key={card.id} card={card} listId={list.id} />
            ))}
          </ListGroup>
        )}
        <InputGroup className="d-flex flex-column gap-3">
          <form
            className="d-flex flex-column gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if(addCardRef.current.value?.length > 0){
                dispatch(
                  addCard({ listId: list.id, name: addCardRef.current.value })
                );
                addCardRef.current.value = "";
              }
              
            }}
          >
            <InputGroup className="d-flex" size="sm">
              <InputGroup.Text
                id="inputGroup-sizing-default"
                className="bg-dark"
              >
                <MdLibraryAdd className="text-light" />
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="name your card"
                className="bg-light"
                ref={addCardRef}
              />
            </InputGroup>
            <Button variant="secondary" type="submit">
              Add card +
            </Button>
          </form>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default TrelloInternalListCard;
