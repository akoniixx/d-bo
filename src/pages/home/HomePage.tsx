import React from "react";
import Layouts from "../../components/layout/Layout";
import { useLocalStorage } from "../../hook/useLocalStorage";
import packageJson from "../../../package.json";

export function HomePage() {
  let version = packageJson.version;
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

      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "90%",
          textAlign: "center",
        }}
      >
        <span>version {version}</span>
      </footer>
    </Layouts>
  );
}
