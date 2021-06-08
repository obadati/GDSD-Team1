type Props = {
  selected: any;
};
const Container: React.FC<Props> = ({ selected }) => {
  return <div>{selected}</div>;
};
export default Container;
