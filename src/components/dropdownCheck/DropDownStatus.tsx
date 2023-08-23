import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Image, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { color, icon } from "../../resource";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { STATUS_SEARCH } from "../../definitions/Status";

interface listProps {
  onSearchType: (value: string, checked: boolean) => void;
  list: any;
  title: any;
  menu?: string;
  mainStatus?: string;
}
export const DropdownStatus: React.FC<listProps> = ({
  onSearchType,
  list,
  title,
  menu,
  mainStatus,
}) => {
  const [visibleStatus, setVisibleStatus] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOptionsSub, setSelectedOptionsSub] = useState<string[]>([]);

  const handleVisibleCreateBy = (newVisible: any) => {
    setVisibleStatus(newVisible);
  };
  const [selectedSubStatusOptions, setSelectedSubStatusOptions] = useState<
    CheckboxValueType[]
  >([]);
  const [indeterminatePending, setIndeterminatePending] = useState(false);
  const [checkAllPending, setCheckAllPending] = useState(false);

  const handleOptionSelect = (value: string) => {
    const updatedSelectedOptions = [...selectedOptions];
    const optionIndex = updatedSelectedOptions.indexOf(value);

    if (optionIndex === -1) {
      updatedSelectedOptions.push(value);
    } else {
      updatedSelectedOptions.splice(optionIndex, 1);
    }
    setSelectedOptions(updatedSelectedOptions);

    if (value === "PENDING") {
      if (optionIndex === -1) {
        setSelectedSubStatusOptions(listSubStatus.map((item) => item.value));
        setSelectedOptionsSub(listSubStatus.map((item) => item.value));
      } else {
        setSelectedSubStatusOptions([]);
        setSelectedOptionsSub([]);
      }
      setCheckAllPending(!checkAllPending);
    }
    const checked = optionIndex === -1;
    onSearchType(value, checked);
  };

  const handleOptionSelectSub = (value: string) => {
    const updatedSelectedOptions = [...selectedOptionsSub];
    const optionIndex = updatedSelectedOptions.indexOf(value);

    if (optionIndex === -1) {
      updatedSelectedOptions.push(value);
    } else {
      updatedSelectedOptions.splice(optionIndex, 1);
    }
    setSelectedOptionsSub(updatedSelectedOptions);

    if (listSubStatus.map((item) => item.value)) {
      if (optionIndex === -1) {
        setSelectedOptions(["PENDING"]);
        setIndeterminatePending(true);
      } else {
        setSelectedOptions([]);
        setIndeterminatePending(false);
      }
      setCheckAllPending(!checkAllPending);
    }
    const checked = optionIndex === -1;
    onSearchType(value, checked);
  };
  const handleSubStatusGroupChange = (
    newSelectedOptions: CheckboxValueType[]
  ) => {
    setSelectedSubStatusOptions(newSelectedOptions);
    const selectedSubStatusCount = listSubStatus.filter((item) =>
      newSelectedOptions.includes(item.value)
    ).length;
    setIndeterminatePending(
      selectedSubStatusCount > 0 && selectedSubStatusCount < 3
    );
    setCheckAllPending(selectedSubStatusCount === 3);
  };

  useEffect(() => {
    if (list === undefined) {
      setSelectedOptions([]);
      setSelectedOptionsSub([]);
      setSelectedSubStatusOptions([]);
      setIndeterminatePending(false);
      setCheckAllPending(false);
    }
  }, [list, mainStatus]);
  const listStatus = [
    mainStatus === "PENDING"
      ? { title: " รอตรวจสอบ", value: "PENDING" }
      : { title: " ใช้งาน", value: "ACTIVE" },
    mainStatus === "ACTIVE"
      ? { title: " ปิดการใช้งาน", value: "INACTIVE" }
      : { title: " ไม่อนุมัติ", value: "REJECTED" },
  ];
  const listSubStatus = [
    { title: " 1-2 วัน", value: "FIRST" },
    { title: " 3-6 วัน", value: "SECOND" },
    { title: " 7 วันขึ้นไป", value: "THIRD" },
  ];
  if (menu === "DRONER" && mainStatus === "PENDING") {
    listStatus.push({
      title: " ข้อมูลไม่ครบถ้วน",
      value: "OPEN",
    });
  }

  const items: MenuProps["items"] = listStatus.map((v, i) => {
    return {
      key: i,
      label: (
        <>
          <Checkbox
            onClick={() => {
              handleOptionSelect(v.value);
              setIndeterminatePending(false);
            }}
            value={v.value}
            checked={
              selectedOptions.includes(v.value) ||
              (v.value === "PENDING" && checkAllPending)
            }
            indeterminate={v.value === "PENDING" && indeterminatePending}
          >
            <div>
              <span>{v.title}</span>
            </div>
          </Checkbox>
          {mainStatus === "PENDING" && v.value === "PENDING" && (
            <Checkbox.Group
              value={selectedSubStatusOptions}
              onChange={handleSubStatusGroupChange}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {listSubStatus.map((item, index) => (
                <Checkbox
                  onClick={() => handleOptionSelectSub(item.value)}
                  checked={
                    mainStatus === "PENDING" && checkAllPending
                      ? true
                      : selectedOptionsSub.includes(item.value)
                  }
                  key={index}
                  value={item.value}
                  style={{ marginLeft: "20px" }}
                >
                  {item.title}
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </>
      ),
    };
  });
  return (
    <>
      <div className="col-lg pt-1 p-1">
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className="col-lg-12 p-1"
          onVisibleChange={handleVisibleCreateBy}
          visible={visibleStatus}
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
                {selectedOptionsSub.length > 0 ? (
                  selectedOptionsSub.length > 0 &&
                  selectedOptionsSub.length < 3 ? (
                    <span style={{ color: color.font, marginLeft: 8 }}>
                      {[
                        selectedOptionsSub.map(
                          (option) => STATUS_SEARCH[option.toString()]
                        ),
                      ].join(", ")}
                    </span>
                  ) : (
                    <span style={{ color: color.font, marginLeft: 8 }}>
                      รอตรวจสอบ
                    </span>
                  )
                ) : selectedOptions.length > 0 ? (
                  <span style={{ color: color.font, marginLeft: 8 }}>
                    {[
                      selectedOptions.map((option) => STATUS_SEARCH[option]),
                    ].join(", ")}
                  </span>
                ) : (
                  <span style={{ marginLeft: 8 }}>{title}</span>
                )}
              </div>
              <div className="col-lg" style={{ textAlign: "end" }}>
                <DownOutlined
                  style={{
                    verticalAlign: 0.5,
                  }}
                />
              </div>
            </div>
          </Button>
        </Dropdown>
      </div>
    </>
  );
};
