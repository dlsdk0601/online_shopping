const GoogleIcon = (props: { width?: string; height?: string }) => {
  return (
    <svg
      className="mx-auto h-8 w-8 text-green-500"
      width={props.width ?? "24"}
      height={props.height ?? "24"}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M17.788 5.108A9 9 0 1021 12h-8" />
    </svg>
  );
};

export default GoogleIcon;
