import Hero from "./components/Hero";

const App = () => {
  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden">
      <Hero />
      <div className="z-0 min-h-dvh bg-blue-500"></div>
    </main>
  );
};

export default App;
