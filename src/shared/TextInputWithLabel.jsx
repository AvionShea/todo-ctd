import styled from "styled-components";

function TextInputWithLabel({
  elementId,
  label,
  onChange,
  ref,
  value,
}) {
  const StyledTextLabel = styled.input`
    color: rgb(119, 10, 141);
  `;
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