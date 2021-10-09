import styled, { css } from 'styled-components';
import React from 'react';

export const FormControl = styled.div`
  width: 100%;
  color: rgb(0, 73, 77);
`;

export const StyledInput = styled.input`
  padding: 1.2rem;
  border: none;
  background-color: rgb(244, 250, 250);
  border-radius: 5px;
  width: 100%;
  font-size: 1.8rem;
  font-family: inherit;
  color: inherit;
  font-weight: 700;
  & :focus {
    ${props => {
      if (props.isInvalid) {
        return css`
          box-shadow: 0 0 0 0.3rem rgba(226, 121, 79, 0.5);
        `;
      } else {
        return css`
          box-shadow: 0 0 0 0.3rem rgba(31, 197, 182, 0.5);
        `;
      }
    }}
  }

  ${props => {
    if (props.isActive) {
      return css`
        box-shadow: 0 0 0 0.3rem rgba(31, 197, 182, 0.5);
      `;
    }
  }}
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  color: rgb(92 111 111);
`;

const Error = styled.p`
  margin-top: 1.2rem;
  font-size: 1.2rem;
  color: red;
  text-align: end;
`;

export const TextField = React.forwardRef((props, ref) => {
  return (
    <>
      <FormControl>
        {props.label && (
          <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
        )}
        <StyledInput {...props} id={props.id} ref={ref} />
        {props.error && props.touched && <Error>{props.error}</Error>}
      </FormControl>
    </>
  );
});

export const TextFieldWithIcon = styled(TextField)`
  background-repeat: no-repeat;
  background-position: 20px;
  text-align: right;
  ${props => {
    return css`
      background-image: url(${props.icon});
    `;
  }}
`;
