export default function Description({ description }) {
  return (
    <div className="border border-secondary rounded-xl py-2 px-4">
      <h1>Description:</h1>
      <p className="ms-8">{description === "" ? "No description provided yet" : description}</p>
    </div>
  );
}
