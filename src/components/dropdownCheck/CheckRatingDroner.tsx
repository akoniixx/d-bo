import React, { useState } from "react";
import { Button, Checkbox, Dropdown, MenuProps } from "antd";
import { DownOutlined, StarFilled } from "@ant-design/icons";
import { color } from "../../resource";

interface ListProps {
  onSearchType: (value: any, checked: boolean) => void;
  title: any;
}

const StarRating = ({ stars }: { stars: number }) => (
  <span
    style={{
      color: "#FFCA37",
      fontSize: "16px",
      marginBottom: "4px",
      margin: -4,
      marginLeft: 2,
    }}
  >
    {[...Array(stars)].map((_, index) => (
      <StarFilled key={index} />
    ))}
  </span>
);

const CheckRatingDroner: React.FC<ListProps> = ({ onSearchType, title }) => {
  const [visibleCreateBy, setVisibleCreateBy] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const handleVisibleCreateBy = (newVisible: any) => {
    setVisibleCreateBy(newVisible);
  };
  const handleOptionSelect = (value: any) => {
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

  const IconWithValue = ({ value }: any) => (
    <span>
      {value}
      <StarFilled
        style={{
          color: "#FFCA37",
          fontSize: "20px",
          marginRight: "4px",
          verticalAlign: 0.5,
        }}
      />
    </span>
  );
  const listApp = [
    {
      key: 5,
      icon: <StarRating stars={5} />,
      value: 5,
      fullVal: <IconWithValue value={5} />,
    },
    {
      key: 4,
      icon: <StarRating stars={4} />,
      value: 4,
      fullVal: <IconWithValue value={4} />,
    },
    {
      key: 3,
      icon: <StarRating stars={3} />,
      value: 3,
      fullVal: <IconWithValue value={3} />,
    },
    {
      key: 2,
      icon: <StarRating stars={2} />,
      value: 2,
      fullVal: <IconWithValue value={2} />,
    },
    {
      key: 1,
      icon: <StarRating stars={1} />,
      value: 1,
      fullVal: <IconWithValue value={1} />,
    },
  ];

  const items: MenuProps["items"] = listApp.map((v, i) => {
    return {
      key: i,
      label: (
        <div className="row">
          <Checkbox
            style={{ alignItems: "center" }}
            onClick={() => handleOptionSelect(v.value)}
            value={v.value}
            checked={selectedOptions.includes(v.value)}
          >
            <span>{v.icon}</span>
          </Checkbox>
        </div>
      ),
    };
  });

  return (
    <div className="col-lg pt-1 p-1">
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
          <div className="row">
            <div className="col-lg-8" style={{ textAlign: "start" }}>
              {selectedOptions.length > 0 ? (
                selectedOptions.length < 5 ? (
                  selectedOptions.map((option, index) => (
                    <span key={option} style={{ color: color.font }}>
                      {listApp.find((app) => app.value === option)?.fullVal}
                      {index < selectedOptions.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span style={{ color: color.font, marginLeft: 8 }}>
                    เลือกทั้งหมด
                  </span>
                )
              ) : (
                <span style={{ marginLeft: 8 }}>{title}</span>
              )}
            </div>
            <div className="col-lg" style={{ textAlign: "end" }}>
              <DownOutlined style={{ verticalAlign: 0.5 }} />
            </div>
          </div>
        </Button>
      </Dropdown>
    </div>
  );
};

export default CheckRatingDroner;
