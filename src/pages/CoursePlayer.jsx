import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiPlayCircle, FiCheckCircle, FiAward, FiHelpCircle, FiX, FiShield, FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CoursePlayer = () => {
  const navigate = useNavigate();
  const certRef = useRef(null);
  
  const courseId = "65f123abc456"; 
  const [user] = useState({ _id: "user123", name: "Eren" });

  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to MERN Stack", duration: "05:20", videoId: "bMknfKXIFA8", isCompleted: false },
    { id: 2, title: "Setting up MongoDB Atlas", duration: "12:45", videoId: "98BzS5Oz5E4", isCompleted: false },
    { id: 3, title: "Express.js Server Configuration", duration: "15:10", videoId: "7H_QH9ipp0Q", isCompleted: false },
    { id: 4, title: "React Router and Layout Setup", duration: "22:30", videoId: "Law7wREgHXo", isCompleted: false },
    { id: 5, title: "Building our First API Endpoint", duration: "18:20", videoId: "k3Vfj-e1Ma4", isCompleted: false },
  ]);

  const quizData = [
    { question: "MERN-এ 'E' দিয়ে কি বোঝায়?", options: ["Elastic", "Express", "Engine", "Ember"], correct: 1 },
    { question: "MongoDB কি ধরনের ডাটাবেস?", options: ["SQL", "Relational", "NoSQL", "Graph"], correct: 2 },
    { question: "React মূলত কি?", options: ["Framework", "Library", "Language", "Database"], correct: 1 },
    { question: "Node.js কোথায় রান করে?", options: ["Browser", "Server", "Mobile", "Compiler"], correct: 1 },
    { question: "HTTP Patch কেন ব্যবহার করা হয়?", options: ["Delete", "Create", "Partial Update", "Fetch"], correct: 2 },
  ];

  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = showQuiz ? "Final Assessment | Luma" : `${currentLesson.title} | Luma Learning`;
  }, [currentLesson, showQuiz]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`https://luma-server.vercel.app/progress/${user._id}/${courseId}`);
        const { completedLessons } = response.data;
        if (completedLessons) {
          const updated = lessons.map(l => ({ ...l, isCompleted: completedLessons.includes(l.id) }));
          setLessons(updated);
          const lastId = response.data.lastWatched || 1;
          setCurrentLesson(lessons.find(l => l.id === lastId) || lessons[0]);
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchProgress();
  }, []);

  const progressPercent = Math.round((lessons.filter(l => l.isCompleted).length / lessons.length) * 100);

  const toggleComplete = async () => {
    if (currentLesson.isCompleted) return;
    try {
      await axios.patch('https://luma-server.vercel.app/update-progress', { userId: user._id, courseId, lessonId: currentLesson.id });
      const updated = lessons.map(l => l.id === currentLesson.id ? { ...l, isCompleted: true } : l);
      setLessons(updated);
      
      const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
      if (currentIndex < lessons.length - 1) {
        setCurrentLesson(lessons[currentIndex + 1]);
      }
    } catch (err) { alert("Error saving progress"); }
  };

  const handleAnswer = (index) => {
    if (index === quizData[currentQuestion].correct) setScore(score + 1);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const downloadCert = () => {
    const input = certRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save(`${user.name}_Certificate.pdf`);
    });
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-[#90ee90]">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#90ee90]/30">
      <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-[#0A0A0A] sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-[12px] font-bold uppercase">
          <FiChevronLeft size={18} /> Dashboard
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Progress</p>
            <p className="text-[#90ee90] font-mono text-sm">{progressPercent}%</p>
          </div>
          <FiShield className="text-[#90ee90]" />
        </div>
      </header>

      <main className="flex flex-col lg:flex-row lg:h-[calc(100vh-64px)]">
        <section className="flex-[3] p-4 md:p-8 overflow-y-auto bg-black">
          {!showQuiz ? (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${currentLesson.videoId}`} allowFullScreen></iframe>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">{currentLesson.title}</h1>
                  <p className="text-gray-500 text-[11px] mt-1 uppercase font-bold">Module {currentLesson.id}</p>
                </div>
                {progressPercent === 100 ? (
                  <button onClick={() => setShowQuiz(true)} className="bg-[#90ee90] text-black px-8 py-3 rounded font-bold text-[12px] uppercase">Start Quiz</button>
                ) : (
                  <button onClick={toggleComplete} className={`px-6 py-3 rounded font-bold text-[12px] border ${currentLesson.isCompleted ? 'bg-white/5 text-gray-400 border-white/10' : 'bg-[#90ee90] text-black'}`}>
                    {currentLesson.isCompleted ? '✓ COMPLETED' : 'MARK COMPLETE & NEXT'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto py-10">
              {!quizFinished ? (
                <div className="bg-[#0A0A0A] p-8 rounded-xl border border-white/10">
                  <p className="text-[#90ee90] text-xs font-bold mb-2">QUESTION {currentQuestion + 1} OF {quizData.length}</p>
                  <h2 className="text-xl font-bold mb-6">{quizData[currentQuestion].question}</h2>
                  <div className="grid gap-3">
                    {quizData[currentQuestion].options.map((opt, i) => (
                      <button key={i} onClick={() => handleAnswer(i)} className="text-left p-4 rounded border border-white/5 hover:bg-[#90ee90]/10 hover:border-[#90ee90] transition-all text-sm">{opt}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#0A0A0A] p-10 rounded-xl border border-[#90ee90]/20 text-center space-y-6">
                  <FiAward size={50} className="text-[#90ee90] mx-auto" />
                  <h2 className="text-2xl font-bold">Quiz Finished! Score: {score}/{quizData.length}</h2>
                  {score >= 4 ? (
                    <button onClick={() => setShowCert(true)} className="bg-white text-black px-10 py-3 rounded font-bold text-[11px] uppercase">Claim Certificate</button>
                  ) : (
                    <button onClick={() => {setQuizFinished(false); setCurrentQuestion(0); setScore(0);}} className="bg-red-500 text-white px-10 py-3 rounded font-bold text-[11px] uppercase">Try Again (Need 80%)</button>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <aside className="flex-1 border-l border-white/10 bg-[#0A0A0A] overflow-y-auto">
          <div className="p-6 border-b border-white/10 sticky top-0 bg-[#0A0A0A] z-10">
            <h3 className="text-[12px] font-bold text-gray-500 uppercase mb-4">Course Content</h3>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#90ee90]" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          {lessons.map((lesson) => (
            <div key={lesson.id} onClick={() => { setShowQuiz(false); setCurrentLesson(lesson); }}
              className={`p-5 flex items-start gap-4 cursor-pointer border-l-2 ${currentLesson.id === lesson.id && !showQuiz ? 'bg-[#90ee90]/5 border-[#90ee90]' : 'border-transparent hover:bg-white/[0.02]'}`}>
              {lesson.isCompleted ? <FiCheckCircle className="text-[#90ee90]" /> : <FiPlayCircle className="text-gray-600" />}
              <div>
                <p className={`text-sm font-medium ${currentLesson.id === lesson.id ? 'text-[#90ee90]' : 'text-gray-300'}`}>{lesson.title}</p>
                <p className="text-[10px] text-gray-600 font-mono mt-1">{lesson.duration}</p>
              </div>
            </div>
          ))}
        </aside>
      </main>

      {showCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="relative group">
            {/* Download Button */}
            <button onClick={downloadCert} className="absolute -top-12 right-0 bg-[#90ee90] text-black px-4 py-2 rounded flex items-center gap-2 font-bold text-xs uppercase shadow-xl hover:bg-white transition-all">
              <FiDownload /> Download PDF
            </button>
            <button onClick={() => setShowCert(false)} className="absolute -top-12 left-0 text-white/50 hover:text-white"><FiX size={24}/></button>

            {/* Certificate View */}
            <div ref={certRef} className="w-[800px] aspect-[1.414/1] bg-white text-black p-10 relative overflow-hidden shadow-2xl">
              <div className="border-[10px] border-[#90ee90] h-full flex flex-col items-center justify-between py-12 px-10 text-center">
                <div className="space-y-2">
                  <h1 className="text-5xl font-black uppercase tracking-widest">Certificate</h1>
                  <p className="text-gray-400 font-bold uppercase tracking-[0.5em]">Completion</p>
                </div>
                <div className="space-y-4">
                  <p className="italic text-gray-500">This is to certify that</p>
                  <h2 className="text-6xl font-black border-b-2 border-black px-6 inline-block">{user.name}</h2>
                  <p className="text-lg max-w-lg mx-auto leading-relaxed">has successfully mastered the professional track of <br/> 
                  <span className="bg-black text-[#90ee90] px-4 py-1 font-bold inline-block mt-2 uppercase">MERN Stack Development</span></p>
                </div>
                <div className="w-full flex justify-between items-end">
                  <div className="text-left border-t border-black pt-2 w-40 font-bold uppercase text-[10px]">Course Director</div>
                  <div className="w-20 h-20 border-4 border-[#90ee90] rounded-full flex items-center justify-center font-black text-[10px] uppercase rotate-12">LUMA SEAL</div>
                  <div className="text-right border-t border-black pt-2 w-40 font-bold uppercase text-[10px]">Date: 29.03.2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;