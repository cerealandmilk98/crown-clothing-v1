import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const LogoContainer = styled(Link)`
  width: 70px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const NavLink = styled(Link)`
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
