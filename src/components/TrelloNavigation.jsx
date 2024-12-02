import React from "react";
import { Container, Image, Navbar, Spinner, Stack } from "react-bootstrap";
import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector } from "react-redux";
import { GrLinkPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const TrelloNavigation = ({boardIdPage}) => {
  const { boardListPending } = useSelector((state) => state.boards);
  const {listsPending, deleteListsPending,deleteCardPending, addCardPending, addListPending } = useSelector(state => state.lists)
  return (
    <Navbar
      variant="dark"
      bg="dark"
      expand="lg"
      className={`shadow position-sticky top-8 rounded-5 ${
        boardListPending  || listsPending || deleteListsPending || addListPending || deleteCardPending || addCardPending && "position-relative z-1"
      }`}
    >
      <Container fluid>
        <Navbar.Brand href="#home">
          <Image
            src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
            thumbnail
            className="bg-transparent h-20 w-20 border border-0"
          />

        </Navbar.Brand>
        {boardIdPage && <Link to={"/board"} className="text-decoration-none">
        <GrLinkPrevious className="text-light mr-2 fs-3 backHover"/>
        </Link>}
        {boardListPending || listsPending || deleteListsPending || addListPending || deleteCardPending || addCardPending ? (
          <Stack className="border-0 border-light w-100 h-100 rounded-5 px-3 py-1 bg-secondary d-flex justify-content-end">
            <Spinner
              animation="grow"
              className="w-100 h-100 d-flex justify-center"
            >
              <LuLayoutDashboard className="text-light fs-2" />
            </Spinner>
          </Stack>
        ) : (
          <div className="border-0 border-light w-100 h-100 rounded-5 px-3 py-1 bg-secondary d-flex justify-content-end">
            <LuLayoutDashboard className="text-light fs-2" />
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default TrelloNavigation;
