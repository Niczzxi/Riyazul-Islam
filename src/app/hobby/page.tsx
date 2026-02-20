
import Footer from "@/components/layouts/Footer";
import Navbar from '@/components/layouts/Navbar';

export default function HobbyPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="pt-32 px-6 md:px-16 max-w-7xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">My Hobbies</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          When I'm not coding, I enjoy exploring new technologies, gaming, and photography.
          (This section is under construction!)
        </p>
      </div>
      <Footer />
    </main>
  );
}
