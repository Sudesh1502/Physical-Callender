import { useState } from 'react'

import './App.css'
import Calendar from './components/Calendar'

function App() {
  

  return (
    <>
       <div className="h-screen w-screen overflow-hidden bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl relative">
        {/* backdrop elements */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 w-full animate-fade-in-up">
          <Calendar />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
