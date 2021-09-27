type Props = {
  // Review: should have correct type.
  selected: any;
};
const Container: React.FC<Props> = ({ selected }) => {
  return <div>{selected}</div>;
};
export default Container;
