import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Image, MenuProps } from "antd";
import React, { useState } from "react";
import { color, icon } from "../../resource";

interface ListProps {
  onSearchType: (value: string, checked: boolean) => void;
  list: any;
  title: string;
}
const CheckDocument: React.FC<ListProps> = ({ onSearchType, list, title }) => {
  const [visibleCreateBy, setVisibleCreateBy] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleVisibleCreateBy = (newVisible: any) => {
    setVisibleCreateBy(newVisible);
  };
  const handleOptionSelect = (value: string) => {
    const updatedSelectedOptions = [...selectedOptions];
    const optionIndex = updatedSelectedOptions.indexOf(value);

    if (optionIndex === -1) {
      updatedSelectedOptions.push(value);
    } else {
      updatedSelectedOptions.splice(optionIndex, 1);
    }
    setSelectedOptions(updatedSelectedOptions);
    const checked = optionIndex === -1;
    onSearchType(value, checked);
  };
  const listDoc = [
    { title: " บัตรประชาชน", value: "ID_CARD" },
    { title: " สมุดบัญชีธนาคาร", value: "BOOKBANK" },
  ];
  const items: MenuProps["items"] = listDoc.map((v, i) => {
    return {
      key: i,
      label: (
        <>
          <Checkbox
            onClick={() => handleOptionSelect(v.value)}
            value={v.value}
            checked={selectedOptions.includes(v.value)}
          >
            <span>{v.title}</span>
          </Checkbox>
        </>
      ),
    };
  });
  return (
    <>
      <div className="col-lg pt-1">
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className="col-lg-12 p-1"
          onVisibleChange={handleVisibleCreateBy}
          visible={visibleCreateBy}
        >
          <Button
            style={{
              color: color.Disable,
              textAlign: "start",
              backgroundColor: color.White,
              height: 32,
              cursor: "pointer",
            }}
          >
            {selectedOptions.length > 0 ? (
              <span style={{ color: color.font }}>
                {[
                  selectedOptions.map(
                    (option) =>
                      listDoc.find((doc) => doc.value === option)?.title
                  ),
                ].join(", ")}
              </span>
            ) : (
              title
            )}
            <DownOutlined
              style={{
                verticalAlign: 2,
              }}
            />
          </Button>
        </Dropdown>
      </div>
    </>
  );
};

export default CheckDocument;
