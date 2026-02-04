const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 mb-3 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
    />
  );
};

export default SearchBar;
