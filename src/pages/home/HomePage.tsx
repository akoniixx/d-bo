import { useLocalStorage } from "../../hook/useLocalStorage";
import packageJson from "../../../package.json";

function HomePage() {
  let version = packageJson.version;
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>ยินดีต้อนรับ</h1>
        <h2>
          คุณ{" "}
          {persistedProfile.firstname +
            " " +
            persistedProfile.lastname}
        </h2>
        <footer
          style={{
            position: "fixed",
            bottom: 0,
            textAlign: "center",
          }}>
          <span>version {version}</span>
        </footer>
      </div>
    </div>
  );
}
export default HomePage;
