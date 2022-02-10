interface ErrorProps {
  error: string | null;
}

function Error(props: ErrorProps) {
  return (
    <div>
      <h1>{props.error} </h1>
    </div>
  );
}

export default Error;
