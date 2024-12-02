import React, {  useState } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  deleteCheckItem,
  updateCheckItem,
} from "../../../slices/boardInternalSlices/cardInternalChecklist/cardCheckListSlice";

const TrelloCheckItem = ({ checkItem, checkList, cardId }) => {
  const [getCheck, setCheck] = useState(checkItem.state);
  const dispatch = useDispatch();
  const onChecked = (e) => {
    setCheck(e.target.checked ? "complete" : "incomplete");
    dispatch(
      updateCheckItem({
        checkItemId: checkItem.id,
        cardId,
        checkListId: checkList.id,
        state: e.target.checked ? "complete" : "incomplete",
      })
    );
  };


  
 
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom border-secondary my-2">
      <div className="d-flex justify-content-center align-items-center gap-4">
        <Form.Check // prettier-ignore
          type="checkbox"
          id="default-checkbox"
          onChange={onChecked}
          checked={getCheck === "complete"}
        />
        <span
          className={
            checkItem.state === "complete" ? "text-decoration-line-through" : ""
          }
        >
          {checkItem.name}
        </span>
      </div>
      <RxCross2
        size={18}
        className="delHover text-secondary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(
            deleteCheckItem({
              idCheckItem: checkItem.id,
              checkListId: checkList.id,
            })
          );
        }}
      />
      
    </div>
  );
};

export default TrelloCheckItem;
