import Dashboard from "./(auth)/Dashboard/page";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";

export default function Portfolio() {
  return (
    <div className="min-h-screen flex-1">
      <Dashboard/>
      {/* <Header/>
      <Section/>
      <Footer/> */}
    </div>
  )
}