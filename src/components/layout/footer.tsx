export function Footer() {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Copyright notice */}
          <p className="text-sm text-gray-300">© {currentYear} Ahmadu Bello University Zaria. All rights reserved.</p>

          {/* Additional footer links (can be expanded) */}
          <div className="mt-2 space-x-4 text-xs text-gray-400">
            <span>Student Affairs Division</span>
            <span>•</span>
            <span>Main Campus, Samaru</span>
            <span>•</span>
            <span>Zaria, Kaduna State</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
