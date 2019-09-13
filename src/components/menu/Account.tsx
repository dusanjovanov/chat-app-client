import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useOutsideClick from "../../hooks/useOutsideClick";
import { logout } from "../../redux/actionCreators";
import { useSelector } from "../../redux/hooks";

const AccountMenu = () => {
  const loggedUser = useSelector(state => state.loggedUser);
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const refDropdown = useRef(null);
  useOutsideClick(
    refDropdown.current,
    () => setDropdownVisibility(false),
    "oc-account-menu"
  );

  const onClick = () => setDropdownVisibility(!isDropdownVisible);
  const onClickLogout = () => dispatch(logout());

  return (
    <>
      <Root
        onClick={onClick}
        isActive={isDropdownVisible}
        className="oc-account-menu"
      >
        {loggedUser.avatar}
        <Dropdown
          style={{ display: isDropdownVisible ? "block" : "none" }}
          ref={refDropdown}
        >
          <NameDropdownItem>
            <Avatar>{loggedUser.avatar}</Avatar>{" "}
            <div>
              <div>
                <strong>{loggedUser.displayName}</strong>
              </div>
              <div>{loggedUser.email}</div>
            </div>
          </NameDropdownItem>
          <ActionDropdownItem onClick={onClickLogout}>
            Log out
          </ActionDropdownItem>
        </Dropdown>
      </Root>
    </>
  );
};

export default AccountMenu;

const Root = styled.div<{ isActive: boolean }>`
  height: 100%;
  border: 0;
  background-color: ${props => (props.isActive ? "#ddd" : "transparent")};
  margin-left: auto;
  margin-right: 10px;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ddd;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  border: 1px solid #ccc;
  background-color: white;
`;

const DropdownItem = styled.div`
  padding: 7px 10px;
`;

const NameDropdownItem = styled(DropdownItem)`
  display: flex;
  align-items: center;
  cursor: auto;
`;

const ActionDropdownItem = styled(DropdownItem)`
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const Avatar = styled.div`
  margin-right: 10px;
`;
