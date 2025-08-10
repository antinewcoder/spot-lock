export default function Footer() {
    return (
      <footer className=" text-blue-400 py-6 mt-auto border-t border-slate-200 bg-white">
        <div className="flex justify-between max-w-auto m-4">
            <div className="font-bold text-lg text-black">Spot Lock</div>
                <nav className="flex space-x-6">
                <a href="/" className="hover:underline">Home</a>
                <a href="/about" className="hover:underline">About</a>
                <a href="/pricing" className="hover:underline">Pricing</a>
                <a href="/contact" className="hover:underline">Contact</a>
                </nav>
            </div>
      <div className="mt-4 text-sm text-slate-700 text-center">
        &copy; 2025 Spot Lock. All rights reserved.
      </div>
        
       
      </footer>
    );
  }