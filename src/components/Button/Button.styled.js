import styled from '@emotion/styled';

export const LoadMoreButton = styled.button`
  border-radius: 8px;
  background-color: #3f51b5;
  text-align: center;
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  width: 180px;
  height: 40px;
  padding: 8px 16px;
  margin: 0 auto;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background-color: #303f9f;

    &:active {
      width: 170px;
      height: 38px;
      font-size: 16px;
    }
    transform: translate(2px);
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.3),
      0px 4px 8px rgba(0, 0, 0, 0.2), 0px 8px 16px rgba(0, 0, 0, 0.1);
  }
`;
