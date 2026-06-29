function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={`${props.classname} h-[50px] bg-white border border-gray-400 rounded-xl p-2 outline-none  hover:shadow-xl placeholder:text-gray-400 text-black transition
           ${
          props.error ? "border border-red-400" : "bg-gray-100"
        }`}
      />
      {props.error && <p className="text-red-500 text-xs mt-1 ml-1">{props.error}</p>}
    </div>
  );
}

export default Input;