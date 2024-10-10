const TextInput = () => {
  return (
    <div className="textInputDiv flex flex-col space-y-2 w-full">
      <label for="123" className="font-semibold">Sample label</label>
      <input
        type="text"
        placeholder="Placeholder"
        className="relative block w-full px-3 py-2 border border-gray-500 rounded-md focus:ring-black focus:border-black placeholder-gray-400"
        id="123"
      />
    </div>
  );
};

export default TextInput;
