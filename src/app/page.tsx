import Image from "next/image";
import styles from "./page.module.css";
import { WordwareFooter } from "@/components/footer";
import MainInput from "@/components/main-input";
import MainTable from "@/components/main-table";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1 className="text-4xl font-bold mb-8">Site copy improvement</h1>
        <div className="mb-16">
          <MainInput />
        </div>
        <MainTable />
      </div>
      <WordwareFooter />
    </main>
  );
}
