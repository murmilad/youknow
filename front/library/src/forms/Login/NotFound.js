import { useTranslation } from "react-i18next";
import LoginWrapper from "./LoginWrapper";

function NotFound() {
  const { t, i18n } = useTranslation();

  return (
    <LoginWrapper>
      <h2 className="page_title">{t("header.not-found")}</h2>
    </LoginWrapper>
  );
}
export default NotFound;
