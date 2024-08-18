import Image from "next/image";
import styles from "./page.module.css";
import { WordwareFooter } from "@/components/footer";
import MainInput from "@/components/main-input";
import MainTable from "@/components/main-table";
import MainContainer from "@/components/main-container";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Site copy improvement</h1>
        <div className="mb-16">
          <MainContainer />
        </div>
      </div>
      <WordwareFooter />
    </main>
  );
}
