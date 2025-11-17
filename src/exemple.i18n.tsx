import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("home"); // ← nom du dossier dans assets

  return (
    <div>
      <h1>{t("title")}</h1>     {/*← clé dans en.json en supposant que le langage est anglais*/}
      <p>{t("description")}</p>
    </div>
  );
}
