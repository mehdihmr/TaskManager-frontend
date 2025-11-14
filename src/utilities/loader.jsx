import loading from "../assets/loading.svg";

export default function Loader({ width }) {
  return (
    <div className={`${width} mx-auto`}>
      <img src={loading} />
    </div>
  );
}
