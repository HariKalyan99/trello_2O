import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../slices/boardInternalSlices/boardListSlice";
import { BsUiChecks } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { TbChecklist } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import {
  getCardCheckList,
  postCheckList,
} from "../../slices/boardInternalSlices/cardInternalChecklist/cardCheckListSlice";
import TrelloCardChecklist from "./InternalCard/TrelloCardChecklist";

const TrelloListCard = ({ card, listId }) => {
  const [show, setShow] = useState(false);
  const checkListRef = useRef("");

  const {
    checkList,
    checkListPending,
    deleteCheckListPending,
    postCheckListPending,
    updateCheckItemPending,
    postCheckItemPending,
    deleteCheckItemPending,
  } = useSelector((state) => state.checklist);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  return (
    <>
      <ListGroup.Item
        className="bg-dark text-light d-flex justify-content-between align-items-center listCardHover"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleShow();
          dispatch(getCardCheckList(card.id));
        }}
      >
        {card.name}
        <div>
          <TiDeleteOutline
            className="fs-2 delHover"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(deleteCard({ cardId: card.id, listId }));
            }}
          />
        </div>
      </ListGroup.Item>

      <Modal
        show={show}
        backdrop="static"
        keyboard={true}
        centered
        style={{ border: "3px solid rgb(245, 103, 126)" }}
      >
        <span
          className="position-absolute top-0 start-100 translate-middle p-2 bg-dark border-2 border-light rounded-circle spanHover"
          onClick={handleClose}
        >
          <RxCross2 size={25} className="text-light" />
        </span>
        <Modal.Header className="bg-dark text-white d-flex justify-content-start align-items-center gap-2">
          <Modal.Title>Card name: "{card.name}"</Modal.Title>
          {[
            checkListPending,
            deleteCheckListPending,
            postCheckListPending,
            updateCheckItemPending,
            postCheckItemPending,
            deleteCheckItemPending,
          ].map((loading, ind) => {
            return (
              loading && (
                <Spinner
                  key={ind}
                  animation="grow"
                  className="d-flex align-items-center justify-content-center bg-black"
                  size="lg"
                >
                  <Spinner
                    animation="grow"
                    size="sm"
                    className="bg-dark border-2 border-danger"
                  />
                </Spinner>
              )
            );
          })}
        </Modal.Header>

        {checkList?.length > 0 && (
          <Modal.Body
            className="bg-dark text-white d-flex justify-content-start align-items-start flex-column gap-2"
            style={{ minHeight: "40vh", height: "auto" }}
          >
            {!checkListPending &&
              checkList?.map((checkList) => (
                <TrelloCardChecklist
                  key={checkList.id}
                  checkList={checkList}
                  cardId={card.id}
                />
              ))}
          </Modal.Body>
        )}

        {!checkList?.length > 0 && (
          <Modal.Body
            className="bg-dark text-white d-flex justify-content-center"
            style={{ minHeight: "40vh" }}
          >
            <Col xs={4} md={4}>
              <Image
                src="https://i.pinimg.com/originals/4c/d2/e3/4cd2e3548da43baeeb65b87c7a45e554.gif"
                roundedCircle
              />
            </Col>
          </Modal.Body>
        )}

        <Modal.Footer className="bg-dark text-white border-5">
          <InputGroup className="d-flex flex-column gap-3">
            <form
              className="d-flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (checkListRef.current.value?.length > 0) {
                  dispatch(
                    postCheckList({
                      name: checkListRef.current.value,
                      cardId: card.id,
                    })
                  );
                  checkListRef.current.value = "";
                }
              }}
            >
              <InputGroup className="d-flex" size="sm">
                <InputGroup.Text
                  id="inputGroup-sizing-default"
                  className="bg-dark"
                >
                  <TbChecklist className="text-light fs-3" />
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="name your checklist"
                  className="bg-light"
                  ref={checkListRef}
                />
              </InputGroup>
              <Button variant="danger" onClick={handleClose}>
                <FaWindowClose />
              </Button>
              <Button variant="light" type="submit" className="checkListSubmit">
                <BsUiChecks className="fs-3 text-black" />
              </Button>
            </form>
          </InputGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TrelloListCard;
