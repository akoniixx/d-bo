import { Form } from "antd";
import Search from "antd/lib/input/Search";

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [form] = Form.useForm();
  const [searchQuery] = useSearchParams();

  useEffect(() => {
    const searchText = searchQuery.get("searchText");
    if (searchText) {
      form.setFieldsValue({
        search: searchText,
      });
      onSearch(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, searchQuery]);

  return (
    <Form
      form={form}
      initialValues={{
        search: searchDefault,
      }}>
      <Form.Item name="search">
        <Search
          {...props}
          onSearch={(value) => {
            onSearch(value);
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default SearchDebounce;
