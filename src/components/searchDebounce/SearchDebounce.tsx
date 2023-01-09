import Search from "antd/lib/input/Search";

import React, { useEffect } from "react";
import { useDebounce } from "../../hook/useDeboune";
import { useEffectOnce } from "../../hook/useEffectOnce";

interface Props {
  searchDefault?: string;
  className?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
}
function SearchDebounce({
  searchDefault,
  onSearch,
  ...props
}: Props) {
  const [search, setSearch] = React.useState("");
  const debounceValue = useDebounce(search, 1000);

  useEffectOnce(() => {
    if (searchDefault) {
      setSearch(searchDefault);
    }
  });
  useEffect(() => {
    if (debounceValue) {
      onSearch(debounceValue);
    }
  }, [debounceValue, onSearch]);
  const onChangeDebounce = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
  };
  return (
    <Search {...props} value={search} onChange={onChangeDebounce} />
  );
}

export default SearchDebounce;
