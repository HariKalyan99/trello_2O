import React, { useEffect, useRef } from "react";
import { Button, Card, Form, InputGroup, ProgressBar } from "react-bootstrap";
import { FaListCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCheckList, postCheckItem } from "../../../slices/boardInternalSlices/cardInternalChecklist/cardCheckListSlice";
import TrelloCheckItem from "./TrelloCheckItem";

const TrelloCardChecklist = ({ checkList, cardId }) => {

  const dispatch = useDispatch();
  const checkItemRef = useRef("");

  return (
    <Card
      style={{
        minWidth: "18rem",
        width: "100%",
        height: "auto",
        minHeight: "8rem",
        overflow: "hidden",
        border: "none",
      }}
    >
      <Card.Header className="d-flex justify-content-between align-items-center bg-black text-light border-black">
        Checklist name: {checkList.name}
        <AiFillDelete
          className="fs-4 text-secondary delHoverCheck"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(deleteCheckList(checkList.id))
          }}
        />
      </Card.Header>
      <Card.Body className="d-flex justify-content-start align-items-start bg-black text-light flex-column">
        <Form className="mb-1 w-100">
          <ProgressBar
            now={( 100 /checkList.checkItems?.length).toFixed(0) * checkList.checkItems.filter((x) => x.state === "complete").length || 0}
            variant="danger"
            label={( 100 /checkList.checkItems?.length).toFixed(0) * checkList.checkItems.filter((x) => x.state === "complete").length || 0}
            className="mb-4 mt-1"
          />
          {checkList.checkItems.map((checkItem) => <TrelloCheckItem key={checkItem.id} checkItem={checkItem} checkList={checkList} cardId={cardId}/>)}
        </Form>

          <form
              className="d-flex w-100"
              id="checkItemForm"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if(checkItemRef.current.value?.length > 0){
                  dispatch(postCheckItem({name: checkItemRef.current.value, checkListId: checkList.id}));
                  checkItemRef.current.value = "";
                }
                
              }}
            >
                <InputGroup className="d-flex  pt-3" size="sm">
            <InputGroup.Text id="inputGroup-sizing-small" className="bg-dark">
              <FaListCheck className="text-light fs-5" />
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="name your checkitem"
              className="bg-light"
              ref={checkItemRef}
            />
            <Button variant="light" className="checkListSubmit" type="submit">
              <FaCheck className="text-black fs-5" />
            </Button>
          </InputGroup>
            </form>
      </Card.Body>
    </Card>
  );
};

export default TrelloCardChecklist;
