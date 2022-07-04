import React from "react";
import Layouts from "../../components/layout/Layout";
import { useLocalStorage } from "../../hook/useLocalStorage";

export function HomePage() {
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  return (
    <Layouts>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <h1>ยินดีต้อนรับ</h1>
        <h2>
          คุณ {persistedProfile.firstname + " " + persistedProfile.lastname}
        </h2>
      </div>
    </Layouts>
  );
}
