function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`p-2 ${props.size ||"w-[350px] h-[50px] "} rounded-xl text-sm transition ${
        props.disabled
          ? `${props.size} text-gray-400 bg-gray-800 cursor-not-allowed`
          : ` cursor-pointer ${props.classname || "bg-blue-500 hover:bg-blue-600 text-white"}`
      }`}
    >
      {props.text}
    </button>
  );
}

export default Button;