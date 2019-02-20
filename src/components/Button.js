
import styled from "styled-components";

export default styled.div`
  background-color: ${props => (props.primary ? "#4caf50" : "#008CBA")};
  border: none;
  color: white;
  padding: 11px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor:pointer;
`;