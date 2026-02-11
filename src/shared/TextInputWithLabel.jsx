import styled from "styled-components";

const StyledTextLabel = styled.input`
    color: rgb(119, 10, 141);
  `;

function TextInputWithLabel({
  elementId,
  label,
  onChange,
  ref,
  value,
}) {
  
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <StyledTextLabel
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel